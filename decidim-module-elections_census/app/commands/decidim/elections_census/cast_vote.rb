# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class CastVote < Rectify::Command
      attr_reader :form, :vote

      def initialize(form)
        @form = form
      end

      def call
        return broadcast(:invalid) if form.invalid?
        return broadcast(:voting_not_open) unless time_to_vote?
        return broadcast(:error) unless cast_vote

        broadcast(:ok, vote)
      end

      private

      def cast_vote
        @vote = voter.with_lock do
          voter.vote!
          Vote.create!(
            code: form.voting_code,
            votes: form.votes,
            receipt: generate_receipt
          )
        end
      rescue ActiveRecord::ActiveRecordError
        @vote = nil
      end

      def voter
        @voter ||= form.voter
      end

      def generate_receipt
        content = form.votes.flat_map do |disability, votes|
          [disability, votes]
        end
        content << form.voting_code
        content = content.join("-")

        Digest::SHA256.hexdigest(content)
      end

      def time_to_vote?
        return true

        voting_starts = Rails.application.secrets.voting_starts
        voting_ends = Rails.application.secrets.voting_ends

        Time.current >= voting_starts && Time.current <= voting_ends
      end
    end
  end
end

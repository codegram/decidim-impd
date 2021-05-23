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
            ballot_style: [voter.disability, voter.secondary_disability].reject(&:blank?)
          )
        end
      rescue ActiveRecord::ActiveRecordError => exception
        byebug
        @vote = nil
      end

      def voter
        @voter ||= form.voter
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

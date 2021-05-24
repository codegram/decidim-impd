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
        return broadcast(:invalid_ballot) unless valid_ballot?
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
            ballot: form.encrypted_ballot,
            ballot_style: [voter.disability, voter.secondary_disability].reject(&:blank?)
          )
        end
      rescue ActiveRecord::ActiveRecordError => exception
        @vote = nil
      end

      def valid_ballot?
        value = form.encrypted_ballot

        value.is_a?(String) && value.present? && Base64.strict_encode64(Base64.decode64(value)) == value
      end

      def voter
        @voter ||= form.voter
      end

      def time_to_vote?
        return true if Rails.env.development?

        voting_starts = Rails.application.secrets.voting_starts
        voting_ends = Rails.application.secrets.voting_ends

        Time.current.between?(voting_starts, voting_ends)
      end
    end
  end
end

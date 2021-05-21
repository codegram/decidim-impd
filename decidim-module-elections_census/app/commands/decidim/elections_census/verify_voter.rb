# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VerifyVoter < Rectify::Command
      attr_reader :form

      def initialize(form)
        @form = form
      end

      def call
        return broadcast(:invalid) if form.invalid?
        return broadcast(:not_present) if voter.blank?
        return broadcast(:pending) unless voter.verified?
        return broadcast(:already_voted) if voter.voted?
        return broadcast(:voting_not_open) unless time_to_vote?
        return broadcast(:error) unless deliver_sms

        broadcast(:ok, voter)
      end

      private

      def deliver_sms
        return true if Rails.env.development?

        SmsGateway.new(form.mobile_phone_number, generate_unique_code).deliver_code
      end

      def voter
        @voter ||= Voter.find_by(
          document_type: form.document_type,
          document_number: form.document_number.upcase,
          birthday: form.birthday,
          organization: form.current_organization
        )
      end

      def generate_unique_code
        range = [*'0'..'9',*'A'..'Z']
        code = Array.new(8) { range.sample }.join

        if Voter.where(voting_code: code).exists?
          generate_unique_code
        else
          voter.with_lock do
            voter.voting_code = code
            voter.save!
          end

          code
        end
      end

      def time_to_vote?
        return true

        voting_starts = Time.new(2021, 6, 1, 0, 0, 0, "+02:00")
        voting_ends = Time.new(2021, 6, 16, 23, 59, 59, "+02:00")

        Time.current >= voting_starts && Time.current <= voting_ends
      end
    end
  end
end

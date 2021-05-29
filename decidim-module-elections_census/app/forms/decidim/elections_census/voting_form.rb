# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VotingForm < SearchForm
      mimic :voting

      DOCUMENT_TYPES = %w(dni nie passport)
      MAX_VOTES_PER_PHONE = 2

      attribute :mobile_phone_number, String
      validates :mobile_phone_number, presence: true, length: {is: 9}
      validate :mobile_phone_number_overuse

      def self.from_params(params, additional_params = {})
        year = params["voting"]["birthday(1i)"]
        month = params["voting"]["birthday(2i)"]
        day = params["voting"]["birthday(3i)"]

        params["voting"]["birthday"] = Date.new(year.to_i, month.to_i, day.to_i) if year.present? && month.present? && day.present?
        params["voting"]["mobile_phone_number"] = params["voting"]["mobile_phone_number"].to_s.gsub(/\D/, '')
        super(params)
      end

      private

      def mobile_phone_number_overuse
        return if mobile_phone_number.to_s.length != 9

        return if Voter
          .where(mobile_phone_number: mobile_phone_number)
          .where.not(voted_at: nil)
          .count < MAX_VOTES_PER_PHONE

        errors.add(:mobile_phone_number, :phone_overuse)
      end
    end
  end
end

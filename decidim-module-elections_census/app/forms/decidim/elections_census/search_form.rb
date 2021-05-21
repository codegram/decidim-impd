# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class SearchForm < Decidim::Form
      mimic :voter

      DOCUMENT_TYPES = %w(dni nie passport)

      attribute :document_type, String
      attribute :document_number, String
      attribute :address_postal_code, String
      attribute :birthday, Date

      validates :document_type, :document_number, :address_postal_code, :birthday, presence: true
      validates :document_type, inclusion: { in: DOCUMENT_TYPES }
      validate :exists_in_census

      def self.from_params(params, additional_params = {})
        if params["voter"]
          year = params["voter"]["birthday(1i)"]
          month = params["voter"]["birthday(2i)"]
          day = params["voter"]["birthday(3i)"]

          params["voter"]["birthday"] = Date.new(year.to_i, month.to_i, day.to_i) if year.present? && month.present? && day.present?
        end

        super(params)
      end

      private

      def exists_in_census
        return if document_number.blank? || document_type.blank? || address_postal_code.blank? || birthday.blank?

        return if Decidim::ElectionsCensus::CensusVerifier.new(document_number, document_type, address_postal_code, birthday).valid?

        errors.add(:document_number, :invalid_census)
        errors.add(:document_type, :invalid_census)
        errors.add(:address_postal_code, :invalid_census)
        errors.add(:birthday, :invalid_census)
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VoterForm < Decidim::Form
      mimic :voter

      DOCUMENT_TYPES = %w(dni nie passport)
      DISABILITIES = %w(physical mental_disorder intellectual auditory_sensory visual_sensory)
      GENDERS = %w(female male)

      attribute :document_type, String
      attribute :document_number, String
      attribute :name, String
      attribute :lastname, String
      attribute :second_lastname, String
      attribute :disability, String
      attribute :secondary_disability, String
      attribute :address_type, String
      attribute :address_name, String
      attribute :address_number, String
      attribute :address_floor, String
      attribute :address_door, String
      attribute :address_postal_code, String
      attribute :birthday, Date
      attribute :gender, String
      attribute :email, String
      attribute :mobile_phone_number, String
      attribute :tos_agreement, Boolean
      attribute :disability_certificate
      attribute :family_book
      attribute :legal_guardian_document_type, String
      attribute :legal_guardian_document_number, String
      attribute :legal_guardian_name, String
      attribute :legal_guardian_lastname, String
      attribute :legal_guardian_second_lastname, String

      validates :document_type, :name, :lastname, :disability, :address, :birthday, :address_type, :address_name, :address_number, :address_floor, :address_door, :address_postal_code, :disability_certificate, :email, :mobile_phone_number, presence: true
      validates :tos_agreement, acceptance: true
      validates :document_type, inclusion: { in: DOCUMENT_TYPES }
      validates :disability, inclusion: { in: DISABILITIES }
      validates :secondary_disability, inclusion: { in: DISABILITIES }, allow_blank: true
      validates :gender, inclusion: { in: GENDERS }, allow_blank: true
      validates :document_number, presence: true, if: ->(form) { form.document_type.blank? || form.document_type != "minor_no_documents" || form.document_type != "no_documents" }
      validates :family_book, :legal_guardian_document_number, :legal_guardian_name, :legal_guardian_lastname, :legal_guardian_second_lastname, presence: true, if: ->(form) { form.needs_legal_guardian? }
      validates :legal_guardian_document_type, inclusion: { in: DOCUMENT_TYPES }, if: ->(form) { form.needs_legal_guardian? }
      validate :different_disabilities
      validate :exists_in_census

      def self.from_params(params, additional_params = {})
        year = params["voter"]["birthday(1i)"]
        month = params["voter"]["birthday(2i)"]
        day = params["voter"]["birthday(3i)"]

        params["voter"]["birthday"] = Date.new(year.to_i, month.to_i, day.to_i) if year.present? && month.present? && day.present?

        super(params)
      end

      def needs_legal_guardian?
        return unless birthday
        (Date.today.to_time.to_i - birthday.to_time.to_i) < 16.years
      end

      def address
        [
          address_type,
          address_name,
          address_number,
          address_floor,
          address_door,
          address_postal_code
        ].join(", ")
      end

      private

      def different_disabilities
        return if disability != secondary_disability

        errors.add(:secondary_disability, :must_be_different)
      end

      def exists_in_census
        return if document_number.blank? || document_type.blank? || address_postal_code.blank? || birthday.blank?

        return if Decidim::ElectionsCensus::CensusVerifier.new(document_number, document_type, address_postal_code, birthday).valid?

        errors.add(:document_number, :invalid_census)
        errors.add(:document_type, :invalid_census)
        errors.add(:address_postal_code, :invalid_census)
        errors.add(:birthday, :invalid_census)
      rescue Faraday::TimeoutError, Faraday::ConnectionFailed
        errors.add(:document_number, :error_with_census)
      end
    end
  end
end

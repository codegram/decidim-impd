# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class MemberForm < Decidim::Form
      mimic :voter

      DOCUMENT_TYPES = %w(dni passport nie minor_no_documents no_documents)
      DISABILITIES = %w(physical intellectual not_reported auditory_sensory visual_sensory mental_disorder other)
      GENDERS = %w(female male other)

      attribute :document_type, String
      attribute :document_number, String
      attribute :name, String
      attribute :lastname, String
      attribute :second_lastname, String
      attribute :disability, String
      attribute :secondary_disability, String
      attribute :address, String
      attribute :birthday, String
      attribute :gender, String
      attribute :email, String
      attribute :mobile_phone_number, String
      attribute :tos_agreement, Boolean

      validates :document_type, :name, :lastname, :disability, :address, :birthday, :gender, presence: true
      validates :tos_agreement, acceptance: true
      validates :document_type, inclusion: { in: DOCUMENT_TYPES }
      validates :disability, inclusion: { in: DISABILITIES }
      validates :secondary_disability, inclusion: { in: DISABILITIES }, allow_blank: true
      validates :gender, inclusion: { in: GENDERS }
      validates :document_number, presence: true, if: ->(form) { form.document_type.blank? || form.document_type != "minor_no_documents" || form.document_type != "no_documents" }
      validate :different_disabilities
      validate :email_or_phone

      private

      def email_or_phone
        return if email.present? || mobile_phone_number.present?

        errors.add(:email, :email_or_phone_required)
        errors.add(:mobile_phone_number, :email_or_phone_required)
      end

      def different_disabilities
        return if disability != secondary_disability

        errors.add(:secondary_disability, :must_be_different)
      end
    end
  end
end

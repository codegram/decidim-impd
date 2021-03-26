# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    # A command with all the business logic when a user creates a report.
    class CreateVoter < Rectify::Command
      # Public: Initializes the command.
      #
      # form         - A form object with the params.
      def initialize(form)
        @form = form
        @voter = nil
        @errors_from_attachments = false
        @certificate = nil
        @family_book = nil
      end

      attr_reader :form, :voter, :certificate, :family_book

      # Executes the command. Broadcasts these events:
      #
      # - :ok when everything is valid, together with the report.
      # - :invalid if the form wasn't valid and we couldn't proceed.
      #
      # Returns nothing.
      def call
        build_voter

        @certificate = build_attachment('Document acreditatiu', form.disability_certificate)
        @family_book = build_attachment('Llibre de família', form.family_book) if form.family_book.present?

        return broadcast(:invalid) if form.invalid? || errors_from_attachments

        transaction do
          voter.save!
          certificate.save!
          family_book.save! if family_book.present?
          broadcast(:ok, voter)
        end
      end

      private

      def build_voter
        @voter = Voter.find_or_initialize_by(
          document_type: form.document_type,
          document_number: form.document_number.upcase,
          organization: form.current_organization
        )

        @voter.name = form.name
        @voter.lastname = form.lastname
        @voter.second_lastname = form.second_lastname
        @voter.legal_guardian_document_type = form.legal_guardian_document_type
        @voter.legal_guardian_document_number = form.legal_guardian_document_number.upcase
        @voter.legal_guardian_name = form.legal_guardian_name
        @voter.legal_guardian_lastname = form.legal_guardian_lastname
        @voter.legal_guardian_second_lastname = form.legal_guardian_second_lastname
        @voter.disability = form.disability
        @voter.secondary_disability = form.secondary_disability
        @voter.address = form.address
        @voter.gender = form.gender
        @voter.email = form.email
        @voter.birthday = form.birthday
        @voter.mobile_phone_number = form.mobile_phone_number.to_s.gsub(/[^\d,\.]/, '')
        @voter.verified_at = nil
      end

      def build_attachment(name, file)
        Attachment.new(
          title: { I18n.locale => name},
          attached_to: voter,
          file: file
        )
      end

      def copy_file_errors(from, to)
        @errors_from_attachments = true

        error_text = if from.errors[:file].present?
                       from.errors[:file].first
                     else
                       from.errors.values.flatten.first
                     end
        form.errors.add(to, error_text)
      end

      def errors_from_attachments
        copy_file_errors(certificate, :disability_certificate) unless certificate.valid?
        copy_file_errors(family_book, :family_book) if family_book && !family_book.valid?

        @errors_from_attachments
      end
    end
  end
end

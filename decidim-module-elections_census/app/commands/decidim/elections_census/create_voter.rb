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
      end

      attr_reader :form

      # Executes the command. Broadcasts these events:
      #
      # - :ok when everything is valid, together with the report.
      # - :invalid if the form wasn't valid and we couldn't proceed.
      #
      # Returns nothing.
      def call
        return broadcast(:invalid) if form.invalid?

        transaction do
          voter = Voter.find_or_initialize_by(
            document_type: form.document_type,
            document_number: form.document_number.upcase,
            organization: form.current_organization
          )

          voter.name = form.name
          voter.lastname = form.lastname
          voter.second_lastname = form.second_lastname
          voter.legal_guardian_document_type = form.legal_guardian_document_type
          voter.legal_guardian_document_number = form.legal_guardian_document_number.upcase
          voter.legal_guardian_name = form.legal_guardian_name
          voter.legal_guardian_lastname = form.legal_guardian_lastname
          voter.legal_guardian_second_lastname = form.legal_guardian_second_lastname
          voter.disability = form.disability
          voter.secondary_disability = form.secondary_disability
          voter.address = form.address
          voter.gender = form.gender
          voter.email = form.email
          voter.birthday = form.birthday
          voter.mobile_phone_number = form.mobile_phone_number.to_s.gsub(/[^\d,\.]/, '')
          voter.verified_at = nil
          voter.save!

          Attachment.create!(
            title: { I18n.locale => 'Document acreditatiu' },
            attached_to: voter,
            file: form.disability_certificate
          )

          if form.family_book.present?
            Attachment.create!(
              title: { I18n.locale => 'Llibre de família' },
              attached_to: voter,
              file: form.family_book
            )
          end

          broadcast(:ok, voter)
        end
      end
    end
  end
end

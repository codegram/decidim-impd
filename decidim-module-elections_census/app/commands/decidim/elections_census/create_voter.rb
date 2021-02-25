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

        voter = Voter.create!(
          document_type: form.document_type,
          document_number: form.document_number,
          name: form.name,
          lastname: form.lastname,
          second_lastname: form.second_lastname,
          disability: form.disability,
          secondary_disability: form.secondary_disability,
          address: form.address,
          birthday: form.birthday,
          gender: form.gender,
          email: form.email,
          mobile_phone_number: form.mobile_phone_number
        )

        broadcast(:ok, voter)
      end
    end
  end
end

# frozen_string_literal: true
require "csv"

module Decidim
  module ElectionsCensus
    module Admin
      # A command with all the business logic when a user creates a report.
      class ImportVoters < Rectify::Command
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

          contents = form.file.read
          detection = CharlockHolmes::EncodingDetector.detect(contents)
          utf8_encoded_content = CharlockHolmes::Converter.convert(contents, detection[:encoding], 'UTF-8')

          data = CSV.parse(utf8_encoded_content, headers: :first_row, col_sep: ";")
          data.each do |voter|
            voter = voter.to_h
            next if voter["TIPUS_DOCUMENT"].blank?
            next if voter["DOCUMENT"].blank?

            ImportVoterJob.perform_later(voter, form.current_organization, form.current_user)
          end
        end
      end
    end
  end
end

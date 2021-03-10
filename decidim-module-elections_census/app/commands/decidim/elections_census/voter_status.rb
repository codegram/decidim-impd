# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VoterStatus < Rectify::Command
      attr_reader :form

      def initialize(form)
        @form = form
      end

      def call
        return broadcast(:invalid) if form.invalid?
        return broadcast(:not_present) if voter.blank?
        return broadcast(:pending) unless voter.verified?

        broadcast(:ok, voter)
      end

      private

      def voter
        @voter ||= Voter.find_by(
          document_type: form.document_type,
          document_number: form.document_number,
          birthday: form.birthday,
          organization: form.current_organization
        )
      end
    end
  end
end

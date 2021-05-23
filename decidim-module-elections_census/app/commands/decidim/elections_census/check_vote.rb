# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class CheckVote < Rectify::Command
      attr_reader :form

      def initialize(form)
        @form = form
      end

      def call
        return broadcast(:invalid) if form.invalid?
        return broadcast(:no_vote) unless vote
        return broadcast(:spoiled) if spoiled?
        return broadcast(:tampered) if tampered?

        broadcast(:ok)
      end

      private

      def vote
        @vote ||= Vote.find_by(receipt: form.receipt)
      end

      def spoiled?
        vote.spoiled?
      end

      def tampered?
        vote.tampered?
      end
    end
  end
end

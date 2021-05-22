# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    # Custom helpers, scoped to the elections_census engine.
    #
    module ApplicationHelper
      def candidate_options(disability)
        candidates = VoteForm::CANDIDATES.fetch(disability).map do |id|
          OpenStruct.new(label: I18n.t(id, scope: "candidates.#{disability}"), value: id)
        end

        candidates << OpenStruct.new(label: I18n.t("candidates.blank"), value: "blank")
        candidates
      end
    end
  end
end

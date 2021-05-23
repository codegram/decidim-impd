# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module AdminLog
      class VotePresenter < Decidim::Log::BasePresenter
        private

        def diff_fields_mapping
          {
            spoiled_at: :date,
            receipt: :string
          }
        end

        def action_string
          case action
          when "spoil"
            "decidim.elections_census.admin_log.spoil_vote"
          else
            super
          end
        end

        def diff_actions
          %w(spoil)
        end

        def i18n_labels_scope
          "activemodel.attributes.vote"
        end

        def i18n_params
          {
            user_name: user_presenter.present,
            vote_receipt: action_log.extra["vote_receipt"]
          }
        end
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module AdminLog
      class VoterPresenter < Decidim::Log::BasePresenter
        private

        def diff_fields_mapping
          {
            verified_at: :date,
            disability: :string,
            secondary_disability: :string
          }
        end

        def action_string
          case action
          when "verify"
            "decidim.elections_census.admin_log.verify_voter"
          when "unverify"
            "decidim.elections_census.admin_log.unverify_voter"
          else
            super
          end
        end

        def diff_actions
          %w(spoil)
        end

        def i18n_labels_scope
          "activemodel.attributes.voter"
        end

        def i18n_params
          {
            user_name: user_presenter.present,
            document_number: action_log.extra["document_number"]
          }
        end
      end
    end
  end
end

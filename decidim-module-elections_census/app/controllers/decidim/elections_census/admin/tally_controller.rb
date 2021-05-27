# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class TallyController < Admin::ApplicationController
        layout "decidim/admin/voters"
        helper_method :can_export_votes?

        def show
        end

        def export_votes
          return unless can_export_votes?

          votes = Vote.find_each.map do |vote|
            {
              receipt: vote.receipt,
              ballot_style: vote.ballot_style,
              ballot: vote.ballot,
              spoiled_at: vote.spoiled_at
            }
          end

          json = votes.to_json
          digest = Digest::SHA256.hexdigest(json)

          send_data(
            json,
            filename: "vots_eleccions_impd_#{digest}.json",
            type: "application/json",
            disposition: :attachment
          )
        end

        def can_export_votes?
          Rails.application.secrets.votes_export_enabled?
        end
      end
    end
  end
end

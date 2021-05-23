# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class TallyController < Admin::ApplicationController
        layout "decidim/admin/voters"

        def show
          @export_votes_enabled = true
        end

        def export_votes
          votes = Vote.find_each.map do |vote|
            {
              receipt: vote.receipt,
              ballot_style: vote.ballot_style,
              ballot: vote.votes,
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
      end
    end
  end
end

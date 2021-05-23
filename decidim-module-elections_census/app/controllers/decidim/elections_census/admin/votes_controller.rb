# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class VotesController < Admin::ApplicationController
        layout "decidim/admin/voters"

        def spoil
          enforce_permission_to :spoil, :vote

          if params["spoil"]
            @form = form(SpoilVoteForm).from_params(params)

            SpoilVote.call(@form) do
              on(:ok) do
                flash[:notice] = I18n.t("votes.spoil.success", scope: "decidim.elections_census")
                redirect_to action: :spoil
              end

              on(:invalid) do
                flash.now[:alert] = I18n.t("votes.spoil.error", scope: "decidim.elections_census")
              end

              on(:voter_not_found) do
                flash.now[:alert] = I18n.t("votes.spoil.voter_not_found", scope: "decidim.elections_census")
              end

              on(:vote_not_found) do
                flash.now[:alert] = I18n.t("votes.spoil.vote_not_found", scope: "decidim.elections_census")
              end

              on(:not_verified) do
                flash.now[:alert] = I18n.t("votes.spoil.not_verified", scope: "decidim.elections_census")
              end

              on(:not_voted) do
                flash.now[:alert] = I18n.t("votes.spoil.not_voted", scope: "decidim.elections_census")
              end

              on(:already_spoiled) do
                flash.now[:alert] = I18n.t("votes.spoil.already_spoiled", scope: "decidim.elections_census")
              end

              on(:spoiling_not_open) do
                flash.now[:alert] = I18n.t("votes.spoil.spoiling_not_open", scope: "decidim.elections_census")
              end
            end
          else
            @form = SpoilVoteForm.new
          end
        end
      end
    end
  end
end

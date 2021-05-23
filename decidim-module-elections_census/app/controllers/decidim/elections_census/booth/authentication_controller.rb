# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Booth
      class AuthenticationController < ApplicationController
        layout "decidim/elections_voting"
        include Rectify::ControllerHelpers
        include Decidim::FormFactory

        def new
          @form = VotingForm.new
        end

        def create
          @form = form(VotingForm).from_params(params)

          VerifyVoter.call(@form) do
            on(:ok) do |voter|
              flash.now[:notice] = I18n.t("booth.vote.start_voting", scope: "decidim.elections_census")

              expose(
                form: VoteForm.new(voter_id: voter.id, voting_digest: voter.password_digest),
                voter: voter
              )

              render template: "decidim/elections_census/booth/vote/new", layout: "decidim/elections_vote"
            end

            on(:pending) do
              flash.now[:warning] = I18n.t("booth.vote.pending", scope: "decidim.elections_census")

              render action: :new
            end

            on(:voting_not_open) do
              flash.now[:warning] = I18n.t("booth.vote.cant_vote_now", scope: "decidim.elections_census")

              render action: :new
            end

            on(:not_present) do
              flash[:alert] = I18n.t("booth.vote.not_present", scope: "decidim.elections_census")
              redirect_to new_voter_path
            end

            on(:invalid) do
              flash.now[:alert] = I18n.t("booth.vote.error", scope: "decidim.elections_census")

              render action: :new
            end

            on(:already_voted) do
              flash.now[:alert] = I18n.t("booth.vote.already_voted", scope: "decidim.elections_census")

              render action: :new
            end
          end
        end
      end
    end
  end
end

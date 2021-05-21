# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VotingController < ApplicationController
      layout "decidim/elections_voting"
      include Decidim::FormFactory

      def check
      end

      def vote
        if params["voting"].present?
          @form = form(VotingForm).from_params(params)
          @status = nil
          @voter = nil

          VerifyVoter.call(@form) do
            on(:ok) do |voter|
              flash.now[:notice] = I18n.t("voting.vote.start_voting", scope: "decidim.elections_census")
              set_voting_status :vote
              set_voter voter
            end

            on(:pending) do
              flash.now[:warning] = I18n.t("voting.vote.pending", scope: "decidim.elections_census")
              set_voting_status :pending
            end

            on(:voting_not_open) do
              flash.now[:warning] = I18n.t("voting.vote.cant_vote_now", scope: "decidim.elections_census")
              set_voting_status :not_open
            end

            on(:not_present) do
              flash[:alert] = I18n.t("voting.vote.not_present", scope: "decidim.elections_census")

              redirect_to action: :new, controller: :voters
            end

            on(:invalid) do
              flash.now[:alert] = I18n.t("voting.vote.error", scope: "decidim.elections_census")
              set_voting_status :form
            end

            on(:already_voted) do
              flash.now[:alert] = I18n.t("voting.vote.already_voted", scope: "decidim.elections_census")
              set_voting_status :already_voted
            end
          end
        else
          set_voting_status :form
          @form = VotingForm.new
        end
      end

      def set_voting_status(status)
        @status = status
      end

      def set_voter(voter)
        @voter = voter
      end
    end
  end
end

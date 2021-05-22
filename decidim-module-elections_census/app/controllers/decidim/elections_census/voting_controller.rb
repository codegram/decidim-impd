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
          handle_voter_verification
        elsif params["vote"].present?
          handle_vote
        else
          set_voting_status :form
          @form = VotingForm.new
        end
      end

      private

      def handle_vote
        @form = form(VoteForm).from_params(params)

        if @form.tampered?
          redirect_to "/"
        else
          @form.valid?
          render layout: "decidim/elections_vote"
          set_voting_status :vote
        end
      end

      def handle_voter_verification
        @form = form(VotingForm).from_params(params)
        @status = nil
        @voter = nil

        VerifyVoter.call(@form) do
          on(:ok) do |voter|
            flash.now[:notice] = I18n.t("voting.vote.start_voting", scope: "decidim.elections_census")
            set_form VoteForm.new(voter_id: voter.id, voting_digest: voter.password_digest)
            set_voting_status :vote
            set_voter voter
            render layout: "decidim/elections_vote"
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
      end

      def set_voting_status(status)
        @status = status
      end

      def set_voter(voter)
        @voter = voter
      end

      def set_form(form)
        @form = form
      end
    end
  end
end

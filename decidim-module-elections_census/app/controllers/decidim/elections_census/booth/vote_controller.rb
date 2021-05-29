# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Booth
      class VoteController < ApplicationController
        layout "decidim/elections_vote"
        include Rectify::ControllerHelpers
        include Decidim::FormFactory
        include Decidim::ElectionsCensus::ApplicationHelper

        before_action :ensure_form_not_tampered

        def new
        end

        def preview
          if !@form.valid?
            render action: :new
          end
        end

        def create
          CastVote.call(@form) do
            on(:ok) do |vote|
              flash.now[:notice] = I18n.t("booth.vote.vote_casted", scope: "decidim.elections_census")
              expose(vote: vote)

              render action: :create
            end

            on(:voting_not_open) do
              flash.now[:warning] = I18n.t("booth.vote.cant_vote_now", scope: "decidim.elections_census")

              render action: :new
            end

            on(:invalid) do
              flash.now[:alert] = I18n.t("booth.vote.error", scope: "decidim.elections_census")

              render action: :new
            end

            on(:invalid_ballot) do
              flash.now[:alert] = I18n.t("booth.vote.invalid_ballot", scope: "decidim.elections_census")

              render action: :new
            end

            on(:error) do
              flash.now[:alert] = I18n.t("booth.vote.cast_vote_failed", scope: "decidim.elections_census")

              render action: :new
            end
          end
        end

        private

        def ensure_form_not_tampered
          @form = form(VoteForm).from_params(params)

          redirect_to "/" if @form.tampered?
        end

        def edit_vote?
          return true unless @form.valid?
          return true if @form.valid? && !@form.preview? && params[:edit_vote]

          false
        end

        def preview_vote?
          return @form.valid? && @form.preview?
        end

        def cast_vote?
          @form.valid? && !@form.preview?
        end
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VotersController < ApplicationController
      layout "decidim/elections_census"
      include Decidim::FormFactory

      def index
      end

      def new
        @form = VoterForm.new
      end

      def create
        @form = form(VoterForm).from_params(params)

        CreateVoter.call(@form) do
          on(:ok) do
            flash[:notice] = I18n.t("voters.create.success", scope: "decidim.elections_census")

            redirect_to action: :search
          end

          on(:invalid) do
            flash.now[:alert] = I18n.t("voters.create.error", scope: "decidim.elections_census")
            render :new
          end
        end
      end

      def search
        if params["voter"].present?
          @form = form(SearchForm).from_params(params)
          @status = "foo"
          @voter = nil

          VoterStatus.call(@form) do
            on(:ok) do |voter|
              flash.now[:notice] = I18n.t("voters.search.success", scope: "decidim.elections_census")
              set_voter_status :ok
              set_voter voter
            end

            on(:pending) do
              flash.now[:warning] = I18n.t("voters.search.pending", scope: "decidim.elections_census")
              set_voter_status :pending
            end

            on(:not_present) do
              flash[:alert] = I18n.t("voters.search.not_present", scope: "decidim.elections_census")

              redirect_to action: :new
            end

            on(:invalid) do
              flash.now[:alert] = I18n.t("voters.search.error", scope: "decidim.elections_census")
              set_voter_status :form
            end
          end
        else
          set_voter_status :form
          @form = SearchForm.new
        end
      end

      def set_voter_status(status)
        @status = status
      end

      def set_voter(voter)
        @voter = voter
      end
    end
  end
end

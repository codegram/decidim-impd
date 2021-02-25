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
          on(:ok) do |proposal|
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
      end
    end
  end
end

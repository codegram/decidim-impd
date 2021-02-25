# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VotersController < ApplicationController
      layout "decidim/elections_census"
      include Decidim::FormFactory

      def index
      end

      def new
        @form = MemberForm.new
      end

      def create
        @form = form(MemberForm).from_params(params)
        @form.valid?
        flash.now[:alert] = I18n.t("member_form.create.error", scope: "decidim.elections_census")
        render :new
        #
        # CreateProposal.call(@form, current_user) do
        #   on(:ok) do |proposal|
        #     flash[:notice] = I18n.t("proposals.create.success", scope: "decidim")
        #
        #     redirect_to "#{Decidim::ResourceLocatorPresenter.new(proposal).path}/compare"
        #   end
        #
        #   on(:invalid) do
        #     flash.now[:alert] = I18n.t("proposals.create.error", scope: "decidim")
        #     render :new
        #   end
        # end
      end
    end
  end
end

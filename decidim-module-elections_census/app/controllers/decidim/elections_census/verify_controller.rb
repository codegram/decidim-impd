# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VerifyController < ApplicationController
      include Rectify::ControllerHelpers
      include Decidim::FormFactory
      layout "decidim/elections_voting"

      def new
        @form = CheckVoteForm.new
      end

      def create
        @form = form(CheckVoteForm).from_params(params)

        CheckVote.call(@form) do
          on(:ok) do
            expose(title: t(".check_ok"), content: t(".exists"))
          end

          on(:no_vote) do
            expose(title: t(".check_failed"), content: t(".no_vote_with_receipt"))
          end

          on(:spoiled) do
            expose(title: t(".check_ok"), content: t(".exists_but_spoiled"))
          end

          on(:tampered) do
            expose(title: t(".check_failed"), content: t(".vote_tampered"))
          end

          on(:invalid) do
            render action: :new
          end
        end
      end
    end
  end
end

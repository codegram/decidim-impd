# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VotingController < ApplicationController
      include Rectify::ControllerHelpers
      layout :choose_layout
      include Decidim::FormFactory
      helper_method :candidate_proposal_ids

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

      def choose_layout
        if @status == :vote || @status == :preview || @status == :vote_casted
          "decidim/elections_vote"
        else
          "decidim/elections_voting"
        end
      end

      def handle_vote
        @form = form(VoteForm).from_params(params)
        return redirect_to "/" if @form.tampered?

        if !@form.valid?
          @status = :vote
        elsif @form.valid? && @form.preview?
          @status = :preview
        elsif @form.valid? && !@form.preview? && params[:edit_vote]
          @status = :vote
        elsif @form.valid? && !@form.preview?
          CastVote.call(@form) do
            on(:ok) do |vote|
              flash.now[:notice] = I18n.t("voting.vote.vote_casted", scope: "decidim.elections_census")
              expose(vote: vote, status: :vote_casted)
            end

            on(:voting_not_open) do
              flash.now[:warning] = I18n.t("voting.vote.cant_vote_now", scope: "decidim.elections_census")
              set_voting_status :not_open
            end

            on(:invalid) do
              flash.now[:alert] = I18n.t("voting.vote.error", scope: "decidim.elections_census")
              set_voting_status :vote
            end

            on(:error) do
              flash.now[:alert] = I18n.t("voting.vote.cast_vote_failed", scope: "decidim.elections_census")
              set_voting_status :vote
            end
          end
        end
      end

      def handle_voter_verification
        @form = form(VotingForm).from_params(params)
        @status = nil

        VerifyVoter.call(@form) do
          on(:ok) do |voter|
            flash.now[:notice] = I18n.t("voting.vote.start_voting", scope: "decidim.elections_census")
            expose(form: VoteForm.new(voter_id: voter.id, voting_digest: voter.password_digest))
            set_voting_status :vote
            expose(voter: voter)
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

      def candidate_proposal_ids
        {
          carme_riu_pascual: "9",
          bertrand_de_five_pragner: "15",
          vanessa_fuentes_heredero: "16",
          angel_urraca_bresciani: "17",
          neus_mora_fernandez: "18",
          cesar_leon_ortega: "11",
          ana_sune_peremiquel: "19",
          xavier_duacastilla_soler: "20",
          leticia_esporrin_sanclemente: "21",
          antonio_de_senillosa_de_olano_nico: "22",
          francisco_javier_ona_sobrino: "6",
          oriol_roqueta_del_rio: "13",
          marta_delgadillo_fernandez: "10",
          raquel_montllor_linares: "1",
          montserrat_vilarrasa_monclus: "3",
          carles_marine_gea: "4",
          miquel_serra_albiac: "7",
          carmen_piquer_pique: "14",
          encarna_munoz_chamorro: "8",
          rafel_tixe_milian: "2",
          anais_garcia_balmana: "5",
          paquita_garcia_caballer: "12"
        }
      end
    end
  end
end

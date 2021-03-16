# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class VotersController < Admin::ApplicationController
        include Decidim::Paginable

        layout "decidim/admin/voters"

        def index
          enforce_permission_to :read, :voter
          @voters = paginate(Decidim::ElectionsCensus::Voter.where(organization: current_organization))
        end

        def verify
          enforce_permission_to :verify, :voter
        end

        def unverify
          enforce_permission_to :unverify, :voter
        end

        def import
          enforce_permission_to :import, :voter

          if params["import"] && params["import"]["file"].present?
            @form = form(ImportForm).from_params(params)

            ImportVoters.call(@form) do
              on(:ok) do |voter|
                flash[:notice] = I18n.t("voters.import.success", scope: "decidim.elections_census")
                redirect_to action: :index
              end

              on(:invalid) do
                flash.now[:alert] = I18n.t("voters.import.error", scope: "decidim.elections_census")
              end
            end
          else
            @form = ImportForm.new
          end
        end
      end
    end
  end
end

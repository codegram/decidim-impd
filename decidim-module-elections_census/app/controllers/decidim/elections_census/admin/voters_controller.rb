# frozen_string_literal: true
require "csv"

module Decidim
  module ElectionsCensus
    module Admin
      class VotersController < Admin::ApplicationController
        include Decidim::Paginable

        layout "decidim/admin/voters"

        def index
          enforce_permission_to :read, :voter
          voters = Decidim::ElectionsCensus::Voter.where(organization: current_organization)

          if params["verified"].present?
            voters = voters.verified
          else
            voters = voters.unverified
          end

          @voters = paginate(voters)
        end

        def verify
          enforce_permission_to :verify, :voter
          voter = Decidim::ElectionsCensus::Voter.find(params[:id])

          Decidim.traceability.perform_action!(
            "verify",
            voter,
            current_user,
            { visibility: "admin-only", document_number: voter.document_number }
          ) do
            voter.verify!
          end

          flash[:notice] = I18n.t("voters.verify.success", scope: "decidim.elections_census")
          redirect_back(fallback_location: { action: :index })
        end

        def unverify
          enforce_permission_to :unverify, :voter
          voter = Decidim::ElectionsCensus::Voter.find(params[:id])

          Decidim.traceability.perform_action!(
            "unverify",
            voter,
            current_user,
            { visibility: "admin-only", document_number: voter.document_number }
          ) do
            voter.unverify!
          end
          flash[:notice] = I18n.t("voters.unverify.success", scope: "decidim.elections_census")
          redirect_back(fallback_location: { action: :index })
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

        def export
          enforce_permission_to :export, :voter

          ExportVotersJob.perform_later(current_user, current_organization)
          flash[:notice] = t("decidim.admin.exports.notice")

          redirect_to action: :index
        end

        def elections_export
          enforce_permission_to :export, :voter

          collection = Decidim::ElectionsCensus::Voter.verified.where(organization: current_organization)
          serializer = Decidim::ElectionsCensus::ElectionVoterSerializer

          csv = CSV.generate do |csv|
            csv << ["NOM", "PRIMER_COGNOM", "SEGON_COGNOM", "TIPUS_DOCUMENT", "DOCUMENT", "DISCAPACITAT_1", "DISCAPACITAT_2", "VOT_ONLINE"]

            collection.find_each do |voter|
              csv << serializer.new(voter).serialize.values
            end
          end

          digest = Digest::SHA256.hexdigest(csv)

          send_data(
            csv,
            filename: "cens_impd_#{digest}.csv",
            type: "text/csv",
            disposition: :attachment
          )
        end
      end
    end
  end
end

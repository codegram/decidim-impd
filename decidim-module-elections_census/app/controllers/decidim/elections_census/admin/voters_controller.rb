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

          book = Spreadsheet::Workbook.new
          worksheets = ["INTEL·LECTUAL", "FÍSICA", "TRANSTORN MENTAL", "SENSORIAL AUDITIVA", "SENSORIAL VISUAL", "ALTRES"].inject({}) do |all, title|
            worksheet = book.create_worksheet(name: title)
            worksheet.row(0).replace(["PRIMER_COGNOM", "SEGON_COGNOM", "NOM", "TIPUS_DOCUMENT", "DOCUMENT", "VOT_ONLINE", "DISCAPACITAT_1", "DISCAPACITAT_2"])
            all.update(title => worksheet)
          end

          voters = ["INTEL·LECTUAL", "FÍSICA", "TRANSTORN MENTAL", "SENSORIAL AUDITIVA", "SENSORIAL VISUAL", "ALTRES"].inject({}) do |all, title|
            all.update(title => [])
          end

          collection.find_each do |voter|
            voter = serializer.new(voter).serialize
            voters[voter[:DISCAPACITAT_1]] << voter
            voters[voter[:DISCAPACITAT_2]] << voter if voter[:DISCAPACITAT_2].present?
          end

          voters.each do |disability, voters|
            voters.sort_by do |voter|
              [
                voter[:PRIMER_COGNOM].to_s.strip,
                voter[:SEGON_COGNOM].to_s.strip,
                voter[:NOM].to_s.strip
              ]
            end.each_with_index do |voter, index|
              worksheet = worksheets[disability]
              values = [
                voter[:PRIMER_COGNOM].to_s.strip,
                voter[:SEGON_COGNOM].to_s.strip,
                voter[:NOM].to_s.strip,
                voter[:TIPUS_DOCUMENT].to_s.strip,
                voter[:DOCUMENT].to_s.strip,
                voter[:VOT_ONLINE].to_s.strip,
                voter[:DISCAPACITAT_1].to_s.strip,
                voter[:DISCAPACITAT_2].to_s.strip
              ]
              worksheet.row(index + 1).replace(values)
            end
          end

          file_contents = StringIO.new
          book.write file_contents
          digest = Digest::SHA256.hexdigest(file_contents.string)

          send_data(
            file_contents.string,
            filename: "cens_impd_#{digest}.xls",
            type: "application/vnd.ms-excel",
            disposition: :attachment
          )
        end
      end
    end
  end
end

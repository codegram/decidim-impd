# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class ExportVotersForElectionsJob < ApplicationJob
        def perform(user, organization, format = "CSV")
          collection = Decidim::ElectionsCensus::Voter.verified.where(organization: organization)
          serializer = Decidim::ElectionsCensus::ElectionVoterSerializer

          export_data = Decidim::Exporters.find_exporter(format).new(collection, serializer).export
          ExportMailer.export(user, "cens_impd_eleccions", export_data).deliver_now
        end
      end
    end
  end
end

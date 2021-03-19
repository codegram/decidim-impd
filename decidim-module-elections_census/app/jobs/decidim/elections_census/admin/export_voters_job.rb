# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class ExportVotersJob < ApplicationJob
        def perform(user, organization, format = "CSV")
          collection = Decidim::ElectionsCensus::Voter.unverified.where(organization: organization)
          serializer = Decidim::ElectionsCensus::VoterSerializer

          export_data = Decidim::Exporters.find_exporter(format).new(collection, serializer).export
          ExportMailer.export(user, "cens_impd", export_data).deliver_now
        end
      end
    end
  end
end

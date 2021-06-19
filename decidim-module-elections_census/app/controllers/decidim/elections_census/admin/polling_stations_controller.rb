# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class PollingStationsController < Admin::ApplicationController
        layout "decidim/admin/voters"

        def edit
          @polling_stations = Decidim::ElectionsCensus::PollingStation.order("name ASC").all
        end

        def update
          params["votes"].each do |id, votes|
            Decidim::ElectionsCensus::PollingStation.find(id).update_attribute(:votes, votes)
          end

          redirect_to action: :edit
        end
      end
    end
  end
end

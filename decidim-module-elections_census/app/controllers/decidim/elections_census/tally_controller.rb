# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class TallyController < ApplicationController
      layout "decidim/elections_voting"

      def decrypt
      end

      def tally
        @stations = Decidim::ElectionsCensus::PollingStation.order("name ASC").all
        @null_votes = @stations.sum(&:null_votes)
        @total_offline_votes = @stations.sum(&:total_votes)
      end
    end
  end
end

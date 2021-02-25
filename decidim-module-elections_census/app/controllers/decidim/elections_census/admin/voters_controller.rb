# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class VotersController < Admin::ApplicationController
        layout "decidim/admin/voters"

        def index
          enforce_permission_to :read, :voter
          @voters = Decidim::ElectionsCensus::Voter.all
        end

        def verify
          enforce_permission_to :verify, :voter
        end

        def unverify
          enforce_permission_to :unverify, :voter
        end
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      # This controller is the abstract class from which all other controllers of
      # this engine inherit.
      #
      # Note that it inherits from `Decidim::Admin::Components::BaseController`, which
      # override its layout and provide all kinds of useful methods.
      class ApplicationController < Decidim::Admin::ApplicationController
        register_permissions(
          Decidim::ElectionsCensus::Admin::ApplicationController,
          Decidim::ElectionsCensus::Admin::Permissions,
          Decidim::Admin::Permissions
        )

        def permission_class_chain
          ::Decidim.permissions_registry.chain_for(::Decidim::ElectionsCensus::Admin::ApplicationController)
        end
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    # This is the engine that runs on the public interface of `ElectionsCensus`.
    class AdminEngine < ::Rails::Engine
      isolate_namespace Decidim::ElectionsCensus::Admin

      paths["db/migrate"] = nil
      paths["lib/tasks"] = nil

      routes do
        # Add admin engine routes here
        # resources :elections_census do
        #   collection do
        #     resources :exports, only: [:create]
        #   end
        # end
        # root to: "elections_census#index"
      end

      def load_seed
        nil
      end
    end
  end
end

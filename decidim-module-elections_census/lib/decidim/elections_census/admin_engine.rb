# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    # This is the engine that runs on the public interface of `ElectionsCensus`.
    class AdminEngine < ::Rails::Engine
      isolate_namespace Decidim::ElectionsCensus::Admin

      paths["db/migrate"] = nil
      paths["lib/tasks"] = nil

      routes do
        resources :voters, only: [:index], as: :voters do
          post :verify, on: :member
          post :unverify, on: :member
          match :import, on: :collection, via: [:get, :post]
          get :export, on: :collection
          get :elections_export, on: :collection
        end

        match :spoil_vote, via: [:get, :post], to: "votes#spoil"
        root to: "voters#index"
      end

      initializer "decidim_elections_census_admin.routes" do
        Decidim::Admin::Engine.routes do
          mount Decidim::ElectionsCensus::AdminEngine => "/elections"
        end
      end

      initializer "decidim_elections_census.voters_menu" do
        Decidim.menu :admin_menu do |menu|
          menu.item I18n.t("voters", scope: "decidim.elections_census.admin"), decidim_elections_census_admin.root_path, icon_name: "lock-locked"
        end
      end

      def load_seed
        nil
      end
    end
  end
end

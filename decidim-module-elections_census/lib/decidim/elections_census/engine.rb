# frozen_string_literal: true

require "rails"
require "decidim/core"

module Decidim
  module ElectionsCensus
    # This is the engine that runs on the public interface of elections_census.
    class Engine < ::Rails::Engine
      isolate_namespace Decidim::ElectionsCensus

      routes do
        resources :voters, only: [:create, :new], as: :voters do
          match "search" => "voters#search", as: :search, via: [:get, :post], on: :collection
        end

        root to: "voters#index"
      end

      initializer "decidim_elections_census.assets" do |app|
        app.config.assets.precompile += %w[decidim_elections_census_manifest.js decidim_elections_census_manifest.css]
      end

      initializer "decidim_elections_census.menu" do
        Decidim.menu :menu do |menu|
          menu.item I18n.t("menu.census", scope: "decidim"),
            decidim_elections_census.root_path,
            position: 2,
            active: %r{^/elections-census/}
        end
      end
    end
  end
end

Decidim.register_global_engine(
  :decidim_elections_census,
  Decidim::ElectionsCensus::Engine,
  at: "/elections-census"
)

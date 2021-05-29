# frozen_string_literal: true

class AddOrganizationToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_elections_census_voters, :decidim_organization_id, :integer
  end
end

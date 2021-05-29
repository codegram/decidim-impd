# frozen_string_literal: true
# This migration comes from decidim_elections_census (originally 20210303170944)

class AddOrganizationToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_elections_census_voters, :decidim_organization_id, :integer
  end
end

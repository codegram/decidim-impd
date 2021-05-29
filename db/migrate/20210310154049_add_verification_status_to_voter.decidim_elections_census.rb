# frozen_string_literal: true
# This migration comes from decidim_elections_census (originally 20210310153925)

class AddVerificationStatusToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_elections_census_voters, :verified_at, :datetime
  end
end

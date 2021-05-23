# This migration comes from decidim_elections_census (originally 20210523071642)
class AddBallotStyleAndSpoilingToVotes < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_elections_census_votes, :ballot_style, :string, array: true, null: false, default: []
    add_column :decidim_elections_census_votes, :spoiled_at, :datetime, null: true
  end
end

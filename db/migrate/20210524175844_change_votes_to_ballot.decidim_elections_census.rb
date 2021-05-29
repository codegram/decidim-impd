# This migration comes from decidim_elections_census (originally 20210524175040)
class ChangeVotesToBallot < ActiveRecord::Migration[5.2]
  def change
    remove_column :decidim_elections_census_votes, :votes
    add_column :decidim_elections_census_votes, :ballot, :text, null: false
  end
end

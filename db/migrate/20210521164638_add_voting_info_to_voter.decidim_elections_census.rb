# This migration comes from decidim_elections_census (originally 20210521162321)
class AddVotingInfoToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_elections_census_voters, :voting_code, :string
    add_column :decidim_elections_census_voters, :voted_at, :datetime
    add_index :decidim_elections_census_voters, :voting_code, unique: true
  end
end

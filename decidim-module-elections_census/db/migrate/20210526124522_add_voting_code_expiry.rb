class AddVotingCodeExpiry < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_elections_census_voters, :voting_code_expires_at, :datetime, null: true
  end
end

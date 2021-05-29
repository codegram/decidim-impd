# This migration comes from decidim_elections_census (originally 20210522203321)
class AddVotes < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'

    create_table :decidim_elections_census_votes, id: :uuid do |t|
      t.string :code, null: false
      t.jsonb :votes, null: false
      t.string :receipt, null: false
    end

    add_index :decidim_elections_census_votes, :code, unique: true
  end
end

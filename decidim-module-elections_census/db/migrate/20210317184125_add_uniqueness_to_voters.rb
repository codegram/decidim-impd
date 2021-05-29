class AddUniquenessToVoters < ActiveRecord::Migration[5.2]
  def change
    add_index :decidim_elections_census_voters, :document_number
  end
end

# frozen_string_literal: true
# This migration comes from decidim_elections_census (originally 20210303165151)

class AddMissingFieldsToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_elections_census_voters, :legal_guardian_document_type, :string
    add_column :decidim_elections_census_voters, :legal_guardian_document_number, :string
    add_column :decidim_elections_census_voters, :legal_guardian_name, :string
    add_column :decidim_elections_census_voters, :legal_guardian_lastname, :string
    add_column :decidim_elections_census_voters, :legal_guardian_second_lastname, :string
  end
end

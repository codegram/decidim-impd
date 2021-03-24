# frozen_string_literal: true
# This migration comes from decidim_elections_census (originally 20210324170641)

class FixGenderMigration < ActiveRecord::Migration[5.2]
  def change
    change_column_null :decidim_elections_census_voters, :gender, true
  end
end

# frozen_string_literal: true

class RemoveRestrictionOnAddress < ActiveRecord::Migration[5.2]
  def change
    change_column_null :decidim_elections_census_voters, :address, true
  end
end

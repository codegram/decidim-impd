# frozen_string_literal: true

class AddVoters < ActiveRecord::Migration[5.2]
  def change
    create_table :decidim_elections_census_voters do |t|
      t.string :name, null: false
      t.string :lastname, null: false
      t.string :second_lastname, null: true
      t.string :document_type, null: false
      t.string :document_number, null: false
      t.string :disability, null: false
      t.string :secondary_disability, null: true
      t.string :address, null: false
      t.date :birthday, null: false
      t.string :gender, null: false
      t.string :email, null: true
      t.string :mobile_phone_number, null: true

      t.timestamps
    end

  end
end

class CreateDecidimElectionsCensusPollingStations < ActiveRecord::Migration[5.2]
  def change
    create_table :decidim_elections_census_polling_stations do |t|
      t.string :name
      t.jsonb :votes

      t.timestamps
    end

    candidates = Decidim::ElectionsCensus::Vote::CANDIDATES.flat_map do |_question, candidates|
      candidates.map(&:to_s)
    end.sort

    (1..8).each do |number|
      votes = candidates.inject({}) do |votes, candidate|
        votes.update(candidate => 0)
      end

      Decidim::ElectionsCensus::PollingStation.create!(name: "Mesa #{number}", votes: votes)
    end
  end
end

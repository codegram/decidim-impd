module Decidim
  module ElectionsCensus
    class PollingStation < ApplicationRecord
      include Decidim::Traceable
      include Decidim::Loggable

      validates :name, :votes, presence: true

      def total_votes
        @total_votes ||= votes.values.map(&:to_i).sum
      end

      def null_votes
        @null_votes ||= votes["nil_vote"].to_i
      end

      def self.votes_for(candidate)
        all.map do |station|
          station.votes[candidate.to_s].to_i
        end.sum
      end

      def self.total_votes_for(candidates)
        candidates.sum do |candidate|
          votes_for(candidate)
        end
      end
    end
  end
end

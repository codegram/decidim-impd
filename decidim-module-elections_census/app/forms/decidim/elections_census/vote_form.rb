# frozen_string_literal: true
require "bcrypt"

module Decidim
  module ElectionsCensus
    class VoteForm < Decidim::Form
      mimic :vote

      attribute :voting_code, String
      attribute :voting_digest, String
      attribute :votes, Hash
      attribute :voter_id, Integer
      attribute :preview, Boolean
      attribute :encrypted_ballot, String

      validates :voter_id, :voter, :voting_code, :voting_digest, presence: true
      validate :voting_code_exists
      validate :voting_code_expired?
      validate :correct_password
      validate :number_of_votes
      validate :valid_options
      validate :integrity

      def self.from_params(params, additional_params = {})
        if params["vote"] && params["vote"]["votes"]
          params["vote"]["votes"] = params["vote"]["votes"].to_unsafe_hash.inject({}) do |new_votes, (disability, selections)|
            if selections.include?("blank")
              new_votes.update(disability => ["blank"])
            else
              new_votes.update(disability => selections)
            end
          end
        end

        if params["vote"] && params["vote"]["voting_code"].present?
          params["vote"]["voting_code"] = params["vote"]["voting_code"].gsub(/\W/, '')
        end

        super(params)
      end

      def serialized_ballot
        @serialized_ballot ||= votes.flat_map do |disability, selected|
          if selected.first == "blank"
            Vote::CANDIDATES_IDS.fetch("#{disability}_blank".to_sym)
          else
            selected.map do |candidate|
              Vote::CANDIDATES_IDS.fetch(candidate.to_sym)
            end
          end
        end.join("#")
      end

      def allowed_disabilities
        return [] unless voter.present?

        @allowed_disabilities ||= [voter.disability, voter.secondary_disability].reject(&:blank?).map(&:to_sym).select{|disability| Decidim::ElectionsCensus::Vote::CANDIDATES.keys.include?(disability) }
      end

      def option_selected?(disability, candidate)
        selected_candidates = votes.fetch(disability, [])
        selected_candidates.include?(candidate.to_s)
      end

      def tampered?
        return true unless voter_id
        return true unless voter
        return true unless BCrypt::Password.new(voting_digest) == voter.password

        false
      rescue BCrypt::Errors::InvalidHash
        true
      end

      def voter
        @voter ||= Voter.where(id: voter_id).first
      end

      private

      def integrity
        errors.add(:base, :invalid) if tampered?
      end

      def number_of_votes
        return if encrypted_ballot.present?

        allowed_disabilities.each do |disability|
          number_of_votes = votes.fetch(disability, []).length
          errors.add(:votes, :too_many_votes) if number_of_votes > Decidim::ElectionsCensus::Vote::MAX_VOTES[disability]
          errors.add(:votes, :at_least_one_vote) if number_of_votes.zero?
        end
      end

      def valid_options
        allowed_disabilities.each do |disability|
          valid_candidates = Decidim::ElectionsCensus::Vote::CANDIDATES.fetch(disability).map(&:to_s) + ["blank"]
          selected_candidates = votes.fetch(disability, [])
          all_selections_valid = selected_candidates.all?{|candidate| valid_candidates.include?(candidate)}
          errors.add(:votes, :invalid_options) unless all_selections_valid
        end
      end

      def voting_code_exists
        return if voting_code.blank?
        return if code_voter.present?

        errors.add(:voting_code, :invalid)
      end

      def voting_code_expired?
        return if voting_code.blank?
        return if voter.voting_code_expires_at > Time.current

        errors.add(:voting_code, :voting_code_expired)
      end

      def code_voter
        @code_voter ||= Voter.find_by(voting_code: voting_code.to_s.upcase)
      end

      def correct_password
        return if voting_digest.blank?
        return if code_voter.blank?

        return errors.add(:voting_code, :invalid) if code_voter.id != voter.id

        return if BCrypt::Password.new(voting_digest) == code_voter.password

        errors.add(:voting_code, :invalid)
      rescue BCrypt::Errors::InvalidHash
        errors.add(:voting_code, :invalid)
      end
    end
  end
end

# frozen_string_literal: true
require "bcrypt"

module Decidim
  module ElectionsCensus
    class VoteForm < Decidim::Form
      mimic :vote

      CANDIDATES = {
        physical: [
          :carme_riu_pascual,
          :bertrand_de_five_pragner,
          :vanessa_fuentes_heredero,
          :angel_urraca_bresciani,
          :neus_mora_fernandez,
          :cesar_leon_ortega,
          :ana_sune_peremiquel,
          :xavier_duacastilla_soler,
          :leticia_esporrin_sanclemente,
          :antonio_de_senillosa_de_olano_nico,
          :francisco_javier_ona_sobrino,
          :oriol_roqueta_del_rio
        ],
        mental_disorder: [
          :marta_delgadillo_fernandez,
          :raquel_montllor_linares
        ],
        intellectual: [
          :montserrat_vilarrasa_monclus,
          :carles_marine_gea,
          :miquel_serra_albiac,
          :carmen_piquer_piquer
        ],
        auditory_sensory: [
          :encarna_munoz_chamorro,
          :rafel_tixe_milian
        ],
        visual_sensory: [
          :anais_garcia_balmana,
          :paquita_garcia_caballero
        ]
      }

      MAX_VOTES = {
        physical: 5,
        mental_disorder: 2,
        intellectual: 1,
        auditory_sensory: 1,
        visual_sensory: 1
      }

      attribute :voting_code, String
      attribute :voting_digest, String
      attribute :votes, Hash
      attribute :voter_id, Integer
      attribute :preview, Boolean

      validates :voter_id, :voter, :voting_code, :voting_digest, presence: true
      validate :voting_code_exists
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

        super(params)
      end

      def allowed_disabilities
        return [] unless voter.present?

        @allowed_disabilities ||= [voter.disability, voter.secondary_disability].reject(&:blank?).map(&:to_sym).select{|disability| CANDIDATES.keys.include?(disability) }
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
        allowed_disabilities.each do |disability|
          number_of_votes = votes.fetch(disability, []).length
          errors.add(:votes, :too_many_votes) if number_of_votes > MAX_VOTES[disability]
          errors.add(:votes, :at_least_one_vote) if number_of_votes.zero?
        end
      end

      def valid_options
        allowed_disabilities.each do |disability|
          valid_candidates = CANDIDATES.fetch(disability).map(&:to_s) + ["blank"]
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

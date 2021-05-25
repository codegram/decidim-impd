# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class SpoilVoteForm < Decidim::Form
        mimic :spoil

        attribute :document_type, String
        attribute :document_number, String
        attribute :disability, String
        attribute :secondary_disability, String
        attribute :vote_id, String
        attribute :birthday, Date

        validates :document_type, :document_number, :disability, :vote_id, :birthday, presence: true

        def self.from_params(params, additional_params = {})
          year = params["spoil"]["birthday(1i)"]
          month = params["spoil"]["birthday(2i)"]
          day = params["spoil"]["birthday(3i)"]

          params["spoil"]["birthday"] = Date.new(year.to_i, month.to_i, day.to_i) if year.present? && month.present? && day.present?

          super(params)
        end

        def ballot_style
          [disability, secondary_disability].reject(&:blank?)
        end

        def voter
          @voter ||= Voter.find_by(
            document_type: document_type,
            document_number: document_number,
            disability: disability,
            secondary_disability: secondary_disability.presence,
            birthday: birthday
          )
        end
      end
    end
  end
end

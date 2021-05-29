# frozen_string_literal: true
require "csv"

module Decidim
  module ElectionsCensus
    module Admin
      class SpoilVote < Rectify::Command
        attr_reader :form

        def initialize(form)
          @form = form
        end

        def call
          return broadcast(:invalid) if form.invalid?
          return broadcast(:spoiling_not_open) unless offline_voting_active?
          return broadcast(:voter_not_found) unless voter
          return broadcast(:not_verified) unless voter.verified?
          return broadcast(:not_voted) unless voter.voted?
          return broadcast(:vote_not_found) unless vote
          return broadcast(:already_spoiled) if vote.spoiled?

          Decidim.traceability.perform_action!(
            "spoil",
            vote,
            form.current_user,
            { visibility: "all", vote_receipt: vote.receipt }
          ) do
            vote.spoil!
          end

          broadcast(:ok)
        end

        private

        def voter
          form.voter
        end

        def vote
          @vote ||= Vote.where(ballot_style: form.ballot_style).where("receipt = ? OR code = ?", form.vote_id, form.vote_id).first
        end

        def spoiled?
          vote.spoiled?
        end

        def offline_voting_active?
          return true if Rails.env.development?

          offline_voting_starts = Rails.application.secrets.offline_voting_starts
          offline_voting_ends = Rails.application.secrets.offline_voting_ends

          Time.current.between?(offline_voting_starts, offline_voting_ends)
        end
      end
    end
  end
end

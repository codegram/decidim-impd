# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class Voter < ApplicationRecord
      belongs_to :organization,
                 foreign_key: "decidim_organization_id",
                 class_name: "Decidim::Organization"

      include Decidim::HasAttachments
      include Decidim::Traceable
      include Decidim::Loggable

      scope :verified, -> { where.not(verified_at: nil) }
      scope :unverified, -> { where(verified_at: nil) }

      def full_name
        [name, lastname, second_lastname].join(" ")
      end

      def verified?
        verified_at.present?
      end

      def verify!
        self.verified_at = Time.current
        save!
      end

      def unverify!
        self.verified_at = nil
        save!
      end

      def voted?
        voted_at.present?
      end

      def vote!
        update_columns(voting_code: nil, voted_at: Time.current, voting_code_expires_at: nil)
      end

      def password
        @password ||= [
          id,
          voting_code,
          document_type,
          document_number,
          mobile_phone_number,
          Rails.application.secret_key_base
        ].join("-")
      end

      def password_digest
        BCrypt::Password.create(password)
      end

      def self.log_presenter_class_for(_log)
        Decidim::ElectionsCensus::AdminLog::VoterPresenter
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class Voter < ApplicationRecord
      belongs_to :organization,
                 foreign_key: "decidim_organization_id",
                 class_name: "Decidim::Organization"

      include Decidim::HasAttachments

      scope :verified, -> { where.not(verified_at: nil) }
      scope :unverified, -> { where(verified_at: nil) }

      def full_name
        [name, lastname, second_lastname].join(" ")
      end

      def verified?
        verified_at.present?
      end

      def verify!
        update_column(:verified_at, Time.current)
      end

      def unverify!
        update_column(:verified_at, nil)
      end

      def voted?
        voted_at.present?
      end

      def vote!
        update_columns(voting_code: nil, voted_at: Time.current)
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
    end
  end
end

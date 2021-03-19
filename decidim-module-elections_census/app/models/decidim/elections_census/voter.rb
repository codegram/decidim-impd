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

      def verified?
        verified_at.present?
      end

      def verify!
        update_column(:verified_at, Time.current)
      end

      def unverify!
        update_column(:verified_at, nil)
      end
    end
  end
end

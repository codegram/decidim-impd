# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class Voter < ApplicationRecord
      belongs_to :organization,
                 foreign_key: "decidim_organization_id",
                 class_name: "Decidim::Organization"

      include Decidim::HasAttachments
    end
  end
end

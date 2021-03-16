# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class ImportForm < Decidim::Form
        attribute :file

        validates :file, presence: true
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class CheckVoteForm < Decidim::Form
      mimic :check

      attribute :receipt, String
      validates :receipt, presence: true
    end
  end
end

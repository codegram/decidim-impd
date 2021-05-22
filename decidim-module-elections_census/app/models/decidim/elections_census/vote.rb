# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class Vote < ApplicationRecord
      validates :code, uniqueness: true
      validates :code, :receipt, :votes, presence: true
    end
  end
end

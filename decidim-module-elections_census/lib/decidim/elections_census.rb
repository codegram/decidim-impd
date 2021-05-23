# frozen_string_literal: true

require "decidim/elections_census/admin"
require "decidim/elections_census/engine"
require "decidim/elections_census/admin_engine"

module Decidim
  # This namespace holds the logic of the `ElectionsCensus` component. This component
  # allows users to create elections_census in a participatory space.
  module ElectionsCensus
    autoload :VoterSerializer, "decidim/elections_census/voter_serializer"
    autoload :ElectionVoterSerializer, "decidim/elections_census/election_voter_serializer"
  end
end

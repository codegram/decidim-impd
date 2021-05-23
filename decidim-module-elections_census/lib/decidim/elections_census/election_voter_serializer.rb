# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class ElectionVoterSerializer < VoterSerializer
      include Decidim::ApplicationHelper

      # Public: Initializes the serializer with a voter.
      def initialize(voter)
        @voter = voter
      end

      # Public: Exports a hash with the serialized data for this voter.
      def serialize
        {
          NOM: voter.name,
          PRIMER_COGNOM: voter.lastname,
          SEGON_COGNOM: voter.second_lastname,
          TIPUS_DOCUMENT: document_type(voter.document_type),
          DOCUMENT: voter.document_number.to_s.upcase,
          DISCAPACITAT_1: disability(voter.disability),
          DISCAPACITAT_2: disability(voter.secondary_disability),
          VOT_ONLINE: voter.voted? ? "SÍ" : ""
        }
      end

      private

      attr_reader :voter
    end
  end
end

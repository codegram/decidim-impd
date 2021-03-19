# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class VoterSerializer < Decidim::Exporters::Serializer
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
          ADRECA: voter.address,
          DATA_NAIXEMENT: birthday,
          GENERE: gender,
          EMAIL: voter.email.to_s.downcase,
          TELEFON: voter.mobile_phone_number,
          DOCUMENT_ACREDITATIU: disability_certificate.try(:url),
          LLIBRE_DE_FAMILIA: family_book.try(:url),
          DATA_CREACIO: voter.created_at,
          DATA_MODIFICACIO: voter.updated_at,
          TUTOR_LEGAL_TIPUS_DOCUMENT: document_type(voter.legal_guardian_document_type),
          TUTOR_LEGAL_DOCUMENT: voter.legal_guardian_document_number.to_s.upcase,
          TUTOR_LEGAL_NOM: voter.legal_guardian_name,
          TUTOR_LEGAL_PRIMER_COGNOM: voter.legal_guardian_lastname,
          TUTOR_LEGAL_SEGON_COGNOM: voter.legal_guardian_second_lastname
        }
      end

      private

      attr_reader :voter

      def disability(value)
        case value
        when "intellectual"
          "INTEL·LECTUAL"
        when "physical"
          "FÍSICA"
        when "mental_disorder"
          "TRANSTORN MENTAL"
        when "auditory_sensory"
          "SENSORIAL AUDITIVA"
        when "visual_sensory"
          "SENSORIAL VISUAL"
        when "other"
          "ALTRES"
        else
          ""
        end
      end

      def gender
        if voter.gender.to_s.downcase == "famale"
          "DONA"
        elsif voter.gender.to_s.downcase == "male"
          "HOME"
        else
          "ALTRE"
        end
      end

      def document_type(value)
        case value
        when "dni"
          "DNI"
        when "person_without_id"
          "PERSONA SENSE DOCUMENTACIÓ"
        when "nie"
          "NIE"
        when "passport"
          "PASSAPORT"
        when "minor_without_id"
          "MENOR SENSE DOCUMENTS"
        end
      end

      def birthday
        voter.birthday.strftime("%d/%m/%Y")
      end

      def disability_certificate
        attachments.find do |attachment|
          attachment.title.values.first == "Document acreditatiu"
        end
      end

      def family_book
        attachments.find do |attachment|
          attachment.title.values.first == "Llibre de família"
        end
      end

      def attachments
        @attachments ||= Attachment.where(attached_to: voter)
      end
    end
  end
end

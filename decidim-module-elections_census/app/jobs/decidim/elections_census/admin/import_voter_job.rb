# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class ImportVoterJob < ApplicationJob
        def perform(voter_data, organization, importer)
          voter = Voter.find_or_initialize_by(document_number: voter_data["DOCUMENT"], organization: organization)

          disability = parse_disability(voter_data["DISCAPACITAT_1"]) unless voter_data["DISCAPACITAT_1"].blank?

          voter.document_type = parse_document_type(voter_data["TIPUS_DOCUMENT"])
          voter.name = voter_data["NOM"] unless voter_data["NOM"].blank?
          voter.lastname = voter_data["PRIMER_COGNOM"] unless voter_data["PRIMER_COGNOM"].blank?
          voter.second_lastname = voter_data["SEGON_COGNOM"] unless voter_data["SEGON_COGNOM"].blank?
          voter.disability = disability
          voter.secondary_disability = parse_disability(voter_data["DISCAPACITAT_2"]) unless voter_data["DISCAPACITAT_2"].blank?
          voter.secondary_disability = nil if voter.disability == voter.secondary_disability
          voter.address = voter_data["ADRECA"] unless voter_data["ADRECA"].blank?
          voter.gender = parse_gender(voter_data["GENERE"]) unless voter_data["GENERE"].blank?
          voter.email = voter_data["EMAIL"].to_s.downcase unless voter_data["EMAIL"].blank?
          voter.birthday = parse_date(voter_data["DATA_NAIXEMENT"]) unless voter_data["DATA_NAIXEMENT"].blank?
          voter.mobile_phone_number = voter_data["TELEFON"].to_s.gsub(/[^\d,\.]/, '') unless voter_data["TELEFON"].blank?
          voter.verified_at = Time.current

          return if voter.disability.blank? || voter.lastname.blank?

          Decidim.traceability.perform_action!(
            "verify",
            voter,
            importer,
            { visibility: "admin-only", document_number: voter.document_number }
          ) do
            voter.save!
          end
        end

        private

        def parse_date(date)
          return if date.blank?
          day, month, year = date.to_s.split("/")
          Date.new(year.to_i, month.to_i, day.to_i)
        end

        def parse_document_type(document_type)
          case document_type
          when "DNI"
            "dni"
          when "PERSONA SENSE DOCUMENTACIÓ"
            "person_without_id"
          when "NIE"
            "nie"
          when "PASSAPORT"
            "passport"
          when "MENOR SENSE DOCUMENTS"
            "minor_without_id"
          else
            raise "Unkown document type #{document_type}"
          end
        end

        def parse_gender(gender)
          if gender.to_s.downcase == "dona"
            "female"
          elsif gender.to_s.downcase == "home"
            "male"
          else
            "other"
          end
        end

        def parse_disability(disability)
          case disability
          when "INTEL·LECTUAL"
            "intellectual"
          when "FÍSICA"
            "physical"
          when "TRANSTORN MENTAL"
            "mental_disorder"
          when "SENSORIAL AUDITIVA"
            "auditory_sensory"
          when "SENSORIAL VISUAL"
            "visual_sensory"
          when "ALTRES"
            "other"
          when "NO INFORMADA"
            nil
          else
            nil
          end
        end
      end
    end
  end
end

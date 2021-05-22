# frozen_string_literal: true

# This class performs a check against the official census database in order
# to verify the citizen's residence.
module Decidim
  module ElectionsCensus
    class CensusVerifier
      include ActionView::Helpers::SanitizeHelper

      attr_reader :document_number
      attr_reader :document_type
      attr_reader :postal_code
      attr_reader :date_of_birth

      def initialize(document_number, document_type, postal_code, date_of_birth)
        @document_number = document_number
        @document_type = document_type
        @postal_code = postal_code
        @date_of_birth = date_of_birth
      end

      def valid?
        return true if Rails.application.secrets.skip_census_verification
        return false unless census_url.present?
        return false if response.blank?

        response.xpath("//codiRetorn").text == "01"
      end

      private

      def census_url
        Rails.application.secrets.census_url
      end

      def sanitized_document_type
        case document_type&.to_sym
        when :dni
          "01"
        when :passport
          "02"
        when :nie
          "03"
        end
      end

      def sanitized_date_of_birth
        @sanitized_date_of_birth ||= date_of_birth&.strftime("%Y%m%d")
      end

      def response
        return nil if document_number.blank? ||
          document_type.blank? ||
          postal_code.blank? ||
          date_of_birth.blank?

        return @response if defined?(@response)

        response ||= Faraday.post census_url do |request|
          request.headers["Content-Type"] = "text/xml"
          request.body = request_body
        end

        @response ||= Nokogiri::XML(response.body).remove_namespaces!
      end


      def request_body
        @request_body ||= <<EOS
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://es.bcn.mci.ws/cr/schemas">
  <soapenv:Header/>
  <soapenv:Body>
    <sch:GetPersonaLocalitzaAdrecaRequest>
      <sch:usuari>PAM</sch:usuari>
      <sch:Dades>
        <sch:tipDocument>#{sanitized_document_type}</sch:tipDocument>
        <sch:docId>#{sanitize document_number&.upcase}</sch:docId>
        <sch:codiPostal>#{sanitize postal_code}</sch:codiPostal>
        <sch:dataNaixConst>#{sanitized_date_of_birth}</sch:dataNaixConst>
      </sch:Dades>
    </sch:GetPersonaLocalitzaAdrecaRequest>
  </soapenv:Body>
</soapenv:Envelope>
EOS
      end
    end
  end
end

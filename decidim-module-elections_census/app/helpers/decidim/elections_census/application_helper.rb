# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    # Custom helpers, scoped to the elections_census engine.
    #
    module ApplicationHelper
      def candidate_proposal_ids
        {
          carme_riu_pascual: "9",
          bertrand_de_five_pragner: "15",
          vanessa_fuentes_heredero: "16",
          angel_urraca_bresciani: "17",
          neus_mora_fernandez: "18",
          cesar_leon_ortega: "11",
          ana_sune_peremiquel: "19",
          xavier_duacastilla_soler: "20",
          leticia_esporrin_sanclemente: "21",
          antonio_de_senillosa_de_olano_nico: "22",
          francisco_javier_ona_sobrino: "6",
          oriol_roqueta_del_rio: "13",
          marta_delgadillo_fernandez: "10",
          raquel_montllor_linares: "1",
          montserrat_vilarrasa_monclus: "3",
          carles_marine_gea: "4",
          miquel_serra_albiac: "7",
          carmen_piquer_piquer: "14",
          encarna_munoz_chamorro: "8",
          rafel_tixe_milian: "2",
          anais_garcia_balmana: "5",
          paquita_garcia_caballero: "12"
        }
      end

      def candidate_options(disability)
        candidates = Decidim::ElectionsCensus::Vote::CANDIDATES.fetch(disability).map do |id|
          OpenStruct.new(label: I18n.t(id, scope: "candidates.#{disability}"), value: id)
        end

        candidates << OpenStruct.new(label: I18n.t("candidates.blank"), value: "blank")
        candidates
      end
    end
  end
end

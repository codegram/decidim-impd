# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class Vote < ApplicationRecord
      include Decidim::Traceable
      include Decidim::Loggable

      CANDIDATES = {
        physical: [
          :carme_riu_pascual,
          :bertrand_de_five_pragner,
          :vanessa_fuentes_heredero,
          :angel_urraca_bresciani,
          :neus_mora_fernandez,
          :cesar_leon_ortega,
          :ana_sune_peremiquel,
          :xavier_duacastilla_soler,
          :leticia_esporrin_sanclemente,
          :antonio_de_senillosa_de_olano_nico,
          :francisco_javier_ona_sobrino,
          :oriol_roqueta_del_rio
        ],
        mental_disorder: [
          :marta_delgadillo_fernandez,
          :raquel_montllor_linares
        ],
        intellectual: [
          :montserrat_vilarrasa_monclus,
          :carles_marine_gea,
          :miquel_serra_albiac,
          :carmen_piquer_piquer
        ],
        auditory_sensory: [
          :encarna_munoz_chamorro,
          :rafel_tixe_milian
        ],
        visual_sensory: [
          :anais_garcia_balmana,
          :paquita_garcia_caballero
        ]
      }.freeze

      CANDIDATES_IDS = {
        carme_riu_pascual: "p_1",
        bertrand_de_five_pragner: "p_2",
        vanessa_fuentes_heredero: "p_3",
        angel_urraca_bresciani: "p_4",
        neus_mora_fernandez: "p_5",
        cesar_leon_ortega: "p_6",
        ana_sune_peremiquel: "p_7",
        xavier_duacastilla_soler: "p_8",
        leticia_esporrin_sanclemente: "p_9",
        antonio_de_senillosa_de_olano_nico: "p_10",
        francisco_javier_ona_sobrino: "p_11",
        oriol_roqueta_del_ri: "p_1w",
        marta_delgadillo_fernandez: "m_1",
        raquel_montllor_linare: "m_2",
        montserrat_vilarrasa_monclus: "i_1",
        carles_marine_gea: "i_2",
        miquel_serra_albiac: "i_3",
        carmen_piquer_pique: "i_4",
        encarna_munoz_chamorro: "a_1",
        rafel_tixe_milia: "a_2",
        anais_garcia_balmana: "v_1",
        paquita_garcia_caballer: "v_2",
        physical_blank: "p_0",
        mental_disorder_blank: "m_0",
        intellectual_blank: "i_0",
        auditory_sensory_blank: "a_0",
        visual_sensory_blank: "v_0"
      }.freeze

      MAX_VOTES = {
        physical: 5,
        mental_disorder: 2,
        intellectual: 1,
        auditory_sensory: 1,
        visual_sensory: 1
      }.freeze

      validates :code, uniqueness: true
      validates :code, :receipt, :ballot, presence: true
      validates :ballot_style, presence: true, length: {minimum: 1, maximum: 2}

      before_validation(on: :create) do
        self.receipt = generate_receipt
      end

      def spoil!
        self.spoiled_at = Time.current
        save!
      end

      def generate_receipt
        content = [ballot, code].join("-")

        Digest::SHA256.hexdigest(content)
      end

      def tampered?
        generate_receipt != receipt
      end

      def spoiled?
        spoiled_at.present?
      end

      def receipt_valid?(other_receipt)
        receipt == other_receipt
      end

      def self.log_presenter_class_for(_log)
        Decidim::ElectionsCensus::AdminLog::VotePresenter
      end
    end
  end
end

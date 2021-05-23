# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    class Vote < ApplicationRecord
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
      }

      MAX_VOTES = {
        physical: 5,
        mental_disorder: 2,
        intellectual: 1,
        auditory_sensory: 1,
        visual_sensory: 1
      }

      validates :code, uniqueness: true
      validates :code, :receipt, :votes, presence: true
      validates :ballot_style, presence: true, length: {minimum: 1, maximum: 2}

      before_validation(on: :create) do
        self.receipt = generate_receipt
      end

      def spoil!
        update_column(:spoiled_at, Time.current)
      end

      def generate_receipt
        content = votes.flat_map do |disability, votes|
          [disability, votes]
        end
        content << code
        content = content.join("-")

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
    end
  end
end

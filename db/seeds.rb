# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# You can remove the 'faker' gem if you don't want Decidim seeds.
if ENV["HEROKU_APP_NAME"].present?
  ENV["DECIDIM_HOST"] = ENV["HEROKU_APP_NAME"] + ".herokuapp.com"
  ENV["SEED"] = "true"
end

return if Rails.env.production? && Decidim::Organization.count > 0

if Rails.env.development?
  Decidim::ElectionsCensus::Voter.delete_all
  Decidim::ElectionsCensus::Vote.delete_all
end

I18n.locale = :ca

organization = Decidim::Organization.first || Decidim::Organization.create!(
  name: "Staging IMPD",
  smtp_settings: {
    from: ENV["EMAIL"],
    user_name: ENV["SENDGRID_USERNAME"],
    encrypted_password: Decidim::AttributeEncryptor.encrypt(ENV["SENDGRID_PASSWORD"]),
    address: "smtp.sendgrid.net",
    port: 587,
    authentication: :plain,
    enable_starttls_auto: true
  },
  host: ENV["DECIDIM_HOST"] || "localhost",
  description: {
    "ca" => "Entorn de proves per l'IMPD",
    "es" => "Entorno de pruebas para el IMPD",
  },
  default_locale: :ca,
  available_locales: [:ca, :es],
  reference_prefix: "sg-impd",
  available_authorizations: Decidim.authorization_workflows.map(&:name),
  users_registration_mode: :enabled,
  tos_version: Time.current,
  badges_enabled: true,
  user_groups_enabled: true,
  send_welcome_notification: true
)

def create_voter(params)
  Decidim::ElectionsCensus::Voter.create!(
    name: "Votant",
    lastname: [translate_disability(params["disability"]), translate_disability(params["secondary_disability"])].reject(&:blank?).join(" - "),
    disability: params["disability"],
    secondary_disability: params["secondary_disability"],
    birthday: Date.new(1980, 1, 1),
    verified_at: Time.current,
    document_type: "dni",
    document_number: params["document_number"],
    organization: params["organization"]
  )
end

def translate_disability(value)
  return value if value.blank?
  I18n.t(value, scope: "decidim.elections_census.disabilities")
end

disabilities = Decidim::ElectionsCensus::Vote::CANDIDATES.keys
counter = 0

disabilities.each do |disability|
  10.times.each do |index|
    counter += 1
    params = {
      "disability" => disability,
      "document_number" => counter.to_s.rjust(9, "0"),
      "organization" => organization
    }

    create_voter(params)
  end

  other_disabilities = disabilities - [disability]
  other_disabilities.each do |secondary_disability|
    5.times.each do |index|
      counter += 1
      params = {
        "disability" => disability,
        "secondary_disability" => secondary_disability,
        "document_number" => counter.to_s.rjust(9, "0"),
        "organization" => organization
      }

      create_voter(params)
    end
  end
end

if Rails.env.development? && Rails.application.secrets.vote_encryption_key.present?
  require 'securerandom'
  require 'jose'

  jwk = Rails.application.secrets.vote_encryption_key
  key = JWT::JWK::RSA.import(jwk).keypair

  def votes_for(disability)
    return [] if disability.blank?
    options = Decidim::ElectionsCensus::Vote::CANDIDATES.fetch(disability.to_sym)
    options = options.shuffle

    number = Decidim::ElectionsCensus::Vote::MAX_VOTES.fetch(disability.to_sym)
    options.sample(number).uniq
  end

  Decidim::ElectionsCensus::Voter.find_each do |voter|
    disability = voter.disability
    secondary_disability = voter.secondary_disability

    votes = {disability => votes_for(disability)}
    votes = votes.update(secondary_disability => votes_for(secondary_disability)) if secondary_disability.present?
    serialized_ballot = votes.flat_map do |disability, selected|
      if selected.first == "blank"
        Decidim::ElectionsCensus::Vote::CANDIDATES_IDS["#{disability}_blank".to_sym]
      else
        selected.map do |candidate|
          Decidim::ElectionsCensus::Vote::CANDIDATES_IDS[candidate.to_sym]
        end
      end
    end.join("#")
    byebug if serialized_ballot.include?("##")

    encrypted_ballot = Base64.strict_encode64(JOSE::JWA::PKCS1.rsaes_oaep_encrypt(OpenSSL::Digest::SHA256, serialized_ballot, key))

    Decidim::ElectionsCensus::Vote.create!(
      code: SecureRandom.uuid,
      ballot: encrypted_ballot,
      ballot_style: [voter.disability, voter.secondary_disability].reject(&:blank?)
    )
  end
end

puts ["Tipus de document", "Número de document", "Discapacitat", "Discapacitat secundària", "Data de naixement"].join(", ")
Decidim::ElectionsCensus::Voter.all.each do |voter|
  puts [voter.document_type.upcase, voter.document_number, translate_disability(voter.disability), translate_disability(voter.secondary_disability), voter.birthday.strftime("%d-%m-%Y")].join(", ")
end

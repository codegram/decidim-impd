# frozen_string_literal: true

$LOAD_PATH.push File.expand_path("lib", __dir__)

require "decidim/elections_census/version"

Gem::Specification.new do |s|
  s.version = Decidim::ElectionsCensus.version
  s.authors = ["Oriol Gual"]
  s.email = ["oriol@codegram.com"]
  s.license = "AGPL-3.0"
  s.homepage = "https://github.com/codegram/decidim-impd"
  s.required_ruby_version = ">= 2.7"

  s.name = "decidim-elections_census"
  s.summary = "A decidim elections_census module"
  s.description = "A component to manage the census for IMPD's elections."

  s.files = Dir["{app,config,lib}/**/*", "LICENSE-AGPLv3.txt", "Rakefile", "README.md"]

  s.add_dependency "decidim-core", Decidim::ElectionsCensus.version
end

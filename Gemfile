# frozen_string_literal: true

source "https://rubygems.org"

ruby RUBY_VERSION

gem "decidim", git: "https://github.com/decidim/decidim.git", branch: "develop"
# gem "decidim-conferences", git: "https://github.com/decidim/decidim.git", branch: "develop"
# gem "decidim-consultations", git: "https://github.com/decidim/decidim.git", branch: "develop"
# gem "decidim-elections", git: "https://github.com/decidim/decidim.git", branch: "develop"
# gem "decidim-initiatives", git: "https://github.com/decidim/decidim.git", branch: "develop"
# gem "decidim-templates", git: "https://github.com/decidim/decidim.git", branch: "develop"

gem "bootsnap", "~> 1.3"

gem "puma", ">= 5.0.0"
gem "uglifier", "~> 4.1"

gem "faker", "~> 2.14"

gem "wicked_pdf", "~> 2.1"

gem "webpacker", "6.0.0.beta.7"

group :development, :test do
  gem "byebug", "~> 11.0", platform: :mri

  gem "decidim-dev", git: "https://github.com/decidim/decidim.git", branch: "develop"
end

group :development do
  gem "letter_opener_web", "~> 1.3"
  gem "listen", "~> 3.1"
  gem "spring", "~> 2.0"
  gem "spring-watcher-listen", "~> 2.0"
  gem "web-console", "~> 4.0"
end

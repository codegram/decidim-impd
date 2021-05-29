# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

namespace :decidim do
  desc "Lists missing strings in each locale"
  task verify_locales: :environment do
    I18n.t(:trigger_load)
    catalan = I18n.backend.send(:translations)[:ca]
    catalan_keys = filter(recursive_parsing(catalan).keys)

    spanish = I18n.backend.send(:translations)[:es]
    spanish_keys = filter(recursive_parsing(spanish).keys)

    puts "Catalan has #{catalan_keys.length} keys"
    puts "Spanish has #{spanish_keys.length} keys"

    puts ""
    puts "Missing keys in Spanish:"
    puts catalan_keys - spanish_keys

    puts ""
    puts "Missing keys in Catalan:"
    puts spanish_keys - catalan_keys
  end
end

def filter(keys)
  keys.reject do |key|
    key.start_with?("faker") ||
      key.start_with?("faker") ||
      key.start_with?("i18n") ||
      key.start_with?("ransack") ||
      key.start_with?("social") ||
      key.start_with?("activerecord") ||
      key.start_with?("number")
  end
end

def recursive_parsing(object, tmp = [])
  case object
  when Array
    object.each.with_index(1).with_object({}) do |(element, i), result|
      result.merge! recursive_parsing(element, tmp + [i])
    end
  when Hash
    object.each_with_object({}) do |(key, value), result|
      result.merge! recursive_parsing(value, tmp + [key])
    end
  else
    { tmp.join('.') => object }
  end
end

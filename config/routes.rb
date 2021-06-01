require "sidekiq/web"
Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  mount Decidim::Core::Engine => '/'
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  get '/elections-census/:path(*all)' => redirect('/elections/%{path}%{all}')
  get '/elections-census/:path' => redirect('/elections/%{path}')
  get '/elections-census' => redirect('/elections')
  get '/vota' => redirect('/elections/booth/auth?locale=ca')
  get '/vota-es' => redirect('/elections/booth/auth?locale=es')
  get '/comprova-vot' => redirect('/elections/verify?locale=ca')
  get '/comprueba-voto' => redirect('/elections/verify?locale=es')
end

require "sidekiq/web"
Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  mount Decidim::Core::Engine => '/'
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  get '/elections-census/:path(*all)' => redirect('/elections/%{path}%{all}')
  get '/elections-census' => redirect('/elections')
  get '/vota' => redirect('/elections/booth/auth')
  get '/vota-es' => redirect('/elections/booth/auth?locale=es')
  get '/comprova-vot' => redirect('/elections/verify')
  get '/comprueba-voto' => redirect('/elections/verify?locale=es')

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories, only: [:create, :index, :show]
    resources :authors, only: [:show, :create, :update]
    resource :session, only: [:show, :create, :destroy]
    get 'search', to: 'utils#search'
  end
end

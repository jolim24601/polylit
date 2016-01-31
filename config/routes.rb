Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories, only: [:create, :index, :show]
    resources :authors, only: [:show, :create, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :tags, only: [:index, :create, :show]
    resources :taggings, only: [:create]

    get 'search', to: 'utils#search'
  end
end

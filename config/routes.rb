Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories, only: [:create, :index, :show, :update]
    resources :authors, only: [:show, :create, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :tags, only: [:index, :create, :show]
    resources :taggings, only: [:create]

    delete 'taggings', to: 'taggings#destroy'
    get 'search', to: 'utils#search'
    get 'me', to: 'authors#show'
  end
end

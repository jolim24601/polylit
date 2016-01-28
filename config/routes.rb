Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :authors, only: [:new]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :stories, only: [:create, :index, :show]
    resources :authors, only: [:show, :create, :update]
  end
end

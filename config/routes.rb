Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories, only: [:create, :index, :show, :update, :destroy] do
      collection do
        get 'top-stories'
      end
    end

    resources :authors, only: [:show, :create, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :tags, only: [:index, :create, :show] do
      collection do
        get 'top-tags'
      end
    end

    resources :taggings, only: [:create]

    delete 'taggings', to: 'taggings#destroy'
    get 'search', to: 'utils#search'
    get 'me', to: 'authors#show'
  end
end

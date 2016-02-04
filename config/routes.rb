Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories, only: [:create, :index, :show, :update, :destroy] do
      collection do
        get 'top-stories'
      end
    end

    get 'stories/tag/:name', to: 'stories#by_tag'

    resources :authors, only: [:show, :create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]

    resources :tags, only: [:create, :show] do
      collection do
        get 'top-tags'
      end
    end

    resources :favorites, only: [:show, :create]
    delete 'favorites', to: 'favorites#destroy'
    resources :bookmarks, only: [:index, :create, :show]
    delete 'bookmarks', to: 'bookmarks#destroy'

    resources :follows, only: [:create, :show, :index]

    resources :taggings, only: [:create]
    delete 'taggings', to: 'taggings#destroy'

    get 'search', to: 'utils#search'
    get 'me', to: 'authors#show'
  end

  get 'auth/:provider/callback', defaults: { format: :json }, to: 'sessions#create'
end

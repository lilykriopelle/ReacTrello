Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:new, :create]
  resources :users, only: [:new, :create, :show]

  namespace :api, defaults: { format: :json } do
    resources :boards
    resources :cards, only: [:create,:update]
    resources :lists, only: [:create, :update]
    resource :session, only: [:destroy, :update, :show]
  end
end

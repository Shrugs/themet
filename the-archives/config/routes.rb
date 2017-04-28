Rails.application.routes.draw do

  get 'recordings', to: 'recordings#index'

  namespace :admin do
    resources :recordings

    root to: "recordings#index"
  end

  root to: "admin/recordings#index"
end

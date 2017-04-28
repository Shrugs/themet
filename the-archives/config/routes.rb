Rails.application.routes.draw do
  namespace :admin do
    resources :recordings

    root to: "recordings#index"
  end

  root to: "admin/recordings#index"
end

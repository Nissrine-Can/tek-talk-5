Rails.application.routes.draw do
  resources :posts
  resources :users, except: [:create]



  get '/get-current-user', to: 'users#get_current_user'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'







  # get '*path',
  #     to: 'fallback#index',
  #     constraints: ->(req) { !req.xhr? && req.format.html? }
  
end

Rails.application.routes.draw do
  resources :topic_posts
  resources :topic_users
  resources :topics, except: [:show]
  get '/topics/:name', to: 'topics#show'
  


  resources :votes  #, except: [:create]
  # post '/post/vote', to: 'votes#create'
 
  resources :posts do
    resources :comments, only: [:create, :index]
  end
  resources :users, except: [:create]

  
  get '/get-current-user', to: 'users#get_current_user'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'


  





  # get '*path',
  #     to: 'fallback#index',
  #     constraints: ->(req) { !req.xhr? && req.format.html? }
  
end

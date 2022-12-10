class Topic < ApplicationRecord
    
    has_many :topic_posts
    has_many :posts, through: :topic_posts



    has_many :topic_users
    has_many :users, through: :topic_users
    
 

end

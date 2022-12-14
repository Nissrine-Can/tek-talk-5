class Topic < ApplicationRecord
    
    has_many :topic_posts
    has_many :posts, through: :topic_posts



    has_many :topic_users
    has_many :users, through: :topic_users
    
    validates :name, presence: true,uniqueness: { case_sensitive: false }

end

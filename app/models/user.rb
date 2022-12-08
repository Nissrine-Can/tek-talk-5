class User < ApplicationRecord
    has_secure_password
    
    has_many :topic_users
    has_many :topics, through: :topic_users

    has_many :posts, dependent: :destroy

    has_many :comments
    has_many :posts, through: :comments

    has_many :votes
    has_many :posts, through: :votes

    
    validates :username, presence: true, uniqueness: { case_sensitive: false }
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: { case_sensitive: false }

    def upvoted_posts
       self.votes.where(upvote: true)
    end

    
    def downvoted_posts
        self.votes.where(upvote: false)
    end



end

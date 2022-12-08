class Post < ApplicationRecord
  belongs_to :user
  
  has_many :topic_posts
  has_many :topics, through: :topic_posts

  has_many :comments
  has_many :users, through: :comments

  has_many :votes
  has_many :users, through: :votes

  accepts_nested_attributes_for :comments, reject_if: :all_blank
  #validates: :body, presence: true

  

  # def score #diff between upvote and downvote
  #   binding.pry
  #   if self.upvoted_posts.length > 0 || self.downvoted_posts.length > 0
  #     self.upvoted_posts.length > 0 ? (self.upvoted_posts.length - self.downvoted_posts.length) : (self.downvoted_posts.length * -1)
  #   else
  #     0
  #   end


  #end


end

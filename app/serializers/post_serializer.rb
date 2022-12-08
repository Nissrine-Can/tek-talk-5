class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :posted_at, :upvotes, :downvotes, :score
  has_one :user
  has_many :comments, serializer: CommentSerializer

  has_many :topics
  

  def upvotes
    self.object.votes.where(upvote: true)
  end
  def downvotes
    self.object.votes.where(upvote: false)
  end

  def score
    upvotes.size - downvotes.size
  end

  def posted_at
   self.object.created_at
  end

  
  

end

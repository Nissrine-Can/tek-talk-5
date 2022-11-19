class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :posted_at
  has_one :user

  has_many :comments, serializer: CommentSerializer


  def posted_at
    #binding.pry
   self.object.created_at
  end


end

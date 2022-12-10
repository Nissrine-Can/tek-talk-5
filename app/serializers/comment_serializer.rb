class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :posted_at, :user
  has_one :user
  has_one :post

  def posted_at
    #binding.pry
   self.object.created_at
  end

end

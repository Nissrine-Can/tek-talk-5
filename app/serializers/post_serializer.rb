class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :posted_at
  has_one :user
end

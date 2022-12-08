class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :upvoted_posts, :downvoted_posts
end

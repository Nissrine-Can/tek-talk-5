class VoteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :post_id, :upvote
  has_one :post
  has_one :user
end

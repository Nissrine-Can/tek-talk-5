class TopicPostSerializer < ActiveModel::Serializer
  attributes :id

  has_one :topic
  has_one :post
end

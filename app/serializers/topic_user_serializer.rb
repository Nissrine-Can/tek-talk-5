class TopicUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id 
  has_one :user
  has_one :topic
end

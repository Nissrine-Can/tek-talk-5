class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :posts


  
  has_many :posts
  
  
  
  
end

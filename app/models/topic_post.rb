class TopicPost < ApplicationRecord
  belongs_to :topic
  belongs_to :post
end

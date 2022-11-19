class Post < ApplicationRecord
  belongs_to :user

  has_many :comments
  has_many :users, through: :comments

  accepts_nested_attributes_for :comments, reject_if: :all_blank
  
  

  #validates: :body, presence: true
end

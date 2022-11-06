class User < ApplicationRecord
    has_secure_password

    has_many :posts, dependent: :destroy

    
    validates :username, presence: true, uniqueness: { case_sensitive: false }
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: { case_sensitive: false }

end

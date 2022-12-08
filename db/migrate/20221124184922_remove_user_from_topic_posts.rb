class RemoveUserFromTopicPosts < ActiveRecord::Migration[7.0]
  def change
    remove_reference :topic_posts, :user, index: true, foreign_key: true
    add_reference :topic_posts, :post, index: true, foreign_key: true
  end
end

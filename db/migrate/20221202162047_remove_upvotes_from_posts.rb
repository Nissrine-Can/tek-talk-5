class RemoveUpvotesFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :upvotes, :integer, :default => 0
    remove_column :posts, :downvotes, :integer, :default => 0
  end
end

class AddUpvotesToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :upvotes, :integer, :default => 0
    add_column :posts, :downvotes, :integer, :default => 0
  end
end

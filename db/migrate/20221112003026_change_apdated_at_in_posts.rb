class ChangeApdatedAtInPosts < ActiveRecord::Migration[7.0]
  def change
    change_column :posts, :posted_at, :datetime
  end
end

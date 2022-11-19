class AddPostedAtToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :posted_at, :datetime
  end
end

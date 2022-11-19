class RemovePolymorphicAttrsToPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :postable_type, :string
    remove_column :posts, :postable_id, :integer
  end
end

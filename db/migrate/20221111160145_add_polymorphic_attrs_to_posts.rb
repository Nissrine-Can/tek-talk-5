class AddPolymorphicAttrsToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :postable_type, :string
    add_column :posts, :postable_id, :integer
  end
end

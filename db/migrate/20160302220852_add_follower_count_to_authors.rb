class AddFollowerCountToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :following_count, :integer, default: 0, null: false
  end
end

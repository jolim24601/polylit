class ReplaceAuthorNamesWithPenName < ActiveRecord::Migration
  def change
    remove_column :authors, :given_name
    remove_column :authors, :last_name
    add_column :authors, :pen_name, :string
    add_index :authors, :pen_name
  end
end

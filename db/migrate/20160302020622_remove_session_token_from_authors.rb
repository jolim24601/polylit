class RemoveSessionTokenFromAuthors < ActiveRecord::Migration
  def change
    remove_column :authors, :session_token
  end
end

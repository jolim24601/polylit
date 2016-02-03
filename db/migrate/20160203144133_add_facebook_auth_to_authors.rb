class AddFacebookAuthToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :provider, :string
    add_column :authors, :uid, :string
  end
end

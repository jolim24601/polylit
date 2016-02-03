class AddIndexToOAuthAndSocialMediaLinks < ActiveRecord::Migration
  def change
    add_index :authors, :provider
    add_index :authors, :uid
    add_index :authors, [:provider, :uid], unique: true
  end
end

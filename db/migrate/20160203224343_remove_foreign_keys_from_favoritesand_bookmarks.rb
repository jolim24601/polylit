class RemoveForeignKeysFromFavoritesandBookmarks < ActiveRecord::Migration
  def change
    remove_foreign_key :favorites, :authors
    remove_foreign_key :bookmarks, :authors
  end
end

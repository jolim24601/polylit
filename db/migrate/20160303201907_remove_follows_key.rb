class RemoveFollowsKey < ActiveRecord::Migration
  def change
    remove_foreign_key :follows, column: "follower_id"
  end
end

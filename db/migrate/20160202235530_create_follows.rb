class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :follower_id, null: false
      t.references :followable, polymorphic: true, index: true
    end

    add_foreign_key :follows, :authors, column: :follower_id
  end
end

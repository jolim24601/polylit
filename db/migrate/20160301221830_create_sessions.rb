class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :session_token
      t.integer :author_id

      t.timestamps null: false
    end

    add_index :sessions, :session_token, unique: true
  end
end

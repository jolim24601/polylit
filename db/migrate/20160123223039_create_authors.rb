class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :given_name
      t.string :last_name
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :authors, :username, unique: true
    add_index :authors, :email, unique: true
    add_index :authors, [:given_name, :last_name]
    add_index :authors, :session_token, unique: true
  end
end

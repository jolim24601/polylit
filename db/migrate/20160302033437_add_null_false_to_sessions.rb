class AddNullFalseToSessions < ActiveRecord::Migration
  def change
    change_column_null :sessions, :session_token, false
    change_column_null :sessions, :author_id, false
  end
end

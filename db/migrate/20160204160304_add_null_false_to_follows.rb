class AddNullFalseToFollows < ActiveRecord::Migration
  def change
    change_column_null :follows, :followable_id, false
    change_column_null :follows, :followable_type, false
  end
end

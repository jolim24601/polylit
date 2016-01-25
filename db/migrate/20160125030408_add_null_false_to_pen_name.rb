class AddNullFalseToPenName < ActiveRecord::Migration
  def change
    change_column_null :authors, :pen_name, false
  end
end

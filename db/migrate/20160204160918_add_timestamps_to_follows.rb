class AddTimestampsToFollows < ActiveRecord::Migration
  def change
    add_column(:follows, :created_at, :datetime)
    add_column(:follows, :updated_at, :datetime)
  end
end

class CacheAuthorsFollowingCount < ActiveRecord::Migration
  def up
    Author.find_each do |author|
      Author.reset_counters(author.id, :following)
    end
  end

  def down
  end
end

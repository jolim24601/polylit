FactoryGirl.define do
  factory :follow do
    follower_id 1
    followable_id 2
    followable_type 'Author'
  end
end

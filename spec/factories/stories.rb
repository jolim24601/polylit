FactoryGirl.define do
  factory :story do
    author_id 1
    node { Faker::Lorem.sentences }
    wordcount { Faker::Number.number(3) }
    favorites_count { Faker::Number.between(1, 999) }

    factory :published_story do
      published true
    end
  end
end

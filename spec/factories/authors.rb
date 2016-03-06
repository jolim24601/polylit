FactoryGirl.define do
  factory :author do
    id { Faker::Number.between(1, 99999) }
    username { Faker::Internet.user_name }
    email { Faker::Internet.email }
    pen_name { Faker::Name.name }
    password_digest { Faker::Internet.password }
    following_count { Faker::Number.between(1, 999) }
  end
end

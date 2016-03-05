FactoryGirl.define do
  factory :story do
    author_id 1
    node  '{"type"=>"doc",
           "content"=>
            [{"type"=>"heading", "attrs"=>{"level"=>3}, "content"=>[{"type"=>"text", "text"=>"Story 1"}]},
             {"type"=>"paragraph"},
             {"type"=>"paragraph", "content"=>[{"type"=>"text", "text"=>"This is going to be a story soon."}]}]}'
    wordcount 10
    favorites_count 0
  end
end

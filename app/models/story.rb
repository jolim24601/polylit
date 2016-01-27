class Story < ActiveRecord::Base
  belongs_to :author, inverse_of: :story
end

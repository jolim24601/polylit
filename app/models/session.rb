class Session < ActiveRecord::Base
  validates :session_token, :author_id, presence: true
  validates :session_token, uniqueness: true

  belongs_to :author

  include SecureToken
end

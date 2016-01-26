class ActiveRecord::Base
  def generate_unique_token_for_field(field)
    token = SecureRandom.base64

    while self.class.exists?(field => token)
      token = SecureRandom.base64
    end

    token
  end
end

class Author < ActiveRecord::Base
  after_initialize :ensure_session_token

  validates :username, :password_digest, :pen_name, presence: true
  validates :email, :session_token, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  def self.find_by_credentials(email, password)
    author = Author.find_by_email(email)

    author && author.is_password?(password) ? author : nil
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_token_for_field(:session_token)
    save!
    session_token
  end

  private

    def ensure_session_token
      self.session_token ||= generate_unique_token_for_field(:session_token)
    end
end

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
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    save!
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end

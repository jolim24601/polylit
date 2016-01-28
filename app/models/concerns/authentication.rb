require 'active_support/concern'

module Authentication
  extend ActiveSupport::Concern

  def generate_unique_token_for_field(field)
    token = SecureRandom.base64
    while self.class.exists?(field => token)
      token = SecureRandom.base64
    end

    token
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

  module ClassMethods
    def find_by_credentials(email, password)
      author = Author.find_by_email(email)

      author && author.is_password?(password) ? author : nil
    end
  end

  private

  def ensure_session_token
    self.session_token ||= generate_unique_token_for_field(:session_token)
  end
end
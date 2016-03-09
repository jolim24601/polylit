require 'active_support/concern'

module Authentication
  extend ActiveSupport::Concern

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def create_session
    session = sessions.new
    session.generate_unique_secure_token(:session_token)
    session.save!
    session.session_token
  end

  module ClassMethods
    def find_by_credentials(email, password)
      author = Author.find_by_email(email)

      author && author.is_password?(password) ? author : nil
    end

    def from_omniauth(auth_hash)
      author = Author.find_or_create_by(
        uid: auth_hash['uid'],
        provider: auth_hash['provider']
      )

      if auth_hash['provider'] == 'twitter'
        # twitter requires you to have your site whitelisted to access emails
        # so just put in random filler here
        author.email = SecureRandom.base64
        author.username = auth_hash['info']['nickname']
      else
        author.email = auth_hash['extra']['raw_info']['email']
        author.username = author.email[/[^@]+/]
      end

      # return author if the account already exists
      author_check = Author.find_by(email: author.email)
      return author_check if author_check

      # generate random strings for email (if none) and password
      author.password = SecureRandom.base64

      author.pen_name = auth_hash['info']['name']
      author.description = auth_hash['info']['description']
      author.avatar = auth_hash['info']['image']
      author.save!
      author
    end
  end
end

require 'active_support/concern'

module SecureToken
  extend ActiveSupport::Concern

  def generate_unique_secure_token(field)
    token = SecureRandom.base64

    while self.class.exists?(field => token)
      token = SecureRandom.base64
    end

    self.send("#{field}=", token)
  end

end

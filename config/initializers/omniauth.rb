Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'],
    secure_image_url: true

  provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
end

class User < ActiveRecord::Base
	has_many :posts

  def self.create_with_omniauth(auth)
    create! do |user|
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.nickname = auth["info"]["nickname"]
      user.token = auth["credentials"]["token"]
      user.secret = auth["credentials"]["secret"]
    end
  end
  
  def tweet(data)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_KEY']
      config.consumer_secret = ENV['TWITTER_SECRET']
      config.oauth_token = self.token
      config.oauth_token_secret = self.secret
    end

    message = [data[:title], data[:post_url]].join(' ')

    # client.update(message)
    # how can I be sure that the image_data.tempfile is being deleted?
    client.update_with_media(message, data[:image].tempfile)
  end
end

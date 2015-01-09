require 'uri'
class User < ActiveRecord::Base
	has_many :posts
	before_validation :ensure_session_token

  # def to_param
  #   username
  # end

  def self.create_with_omniauth(auth)
    create! do |user|
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.username = auth["info"]["nickname"]
      user.description = auth["info"]["description"]
      user.image_url = auth["info"]["image"]
      user.twitter_url = auth["info"]["urls"]["Twitter"]
      user.token = auth["credentials"]["token"]
      user.secret = auth["credentials"]["secret"]

    end
  end
  
  def tweet(data)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_KEY']
      config.consumer_secret = ENV['TWITTER_SECRET']
      config.access_token = self.token
      config.access_token_secret = self.secret
    end
    message = [data[:title], data[:post_url]].join(' ')

    # client.update(message)
    # how can I be sure that the image_data.tempfile is being deleted?
    client.update_with_media(message, data[:image].tempfile)
  end

  def ensure_session_token
		self.session_token ||= generate_session_token
	end

	def reset_session_token!
		self.session_token = ensure_session_token
		save!
		self.session_token
	end

	def generate_session_token
		SecureRandom.base64(32)
	end
end

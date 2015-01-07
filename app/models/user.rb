require 'tempfile'

class User < ActiveRecord::Base
  def self.create_with_omniauth(auth)
    create! do |user|
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.nickname = auth["info"]["nickname"]
      user.token = auth["credentials"]["token"]
      user.secret = auth["credentials"]["secret"]
    end
  end
  
  def tweet(image_data)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_KEY']
      config.consumer_secret = ENV['TWITTER_SECRET']
      config.oauth_token = self.token
      config.oauth_token_secret = self.secret
    end

  #   img = Tempfile.new(['temp_image','.png'], Dir.tmpdir, 'wb')
		
		# byebug
		# img.write(image_data.read)

		

    
    # client.update(message)
    client.update_with_media('test message', image_data.tempfile)
    # img.close! # closes and deletes the temp file 
  end
end

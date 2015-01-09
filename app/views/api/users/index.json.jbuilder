json.array! @users do |user|
	json.(user, :id, :name, :username, :image_url, :description, :twitter_url)
end
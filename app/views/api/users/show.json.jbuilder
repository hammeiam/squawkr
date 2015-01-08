json.(@user, :id, :name, :username, :image_url, :description, :twitter_url)
if current_user && @user.id == current_user.id
	json.logged_in true
end
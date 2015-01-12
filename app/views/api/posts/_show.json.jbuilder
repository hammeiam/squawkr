json.(post, :id, :post_body, :post_title, :created_at, :twitter_url)
json.link ('#u/' + post.user.username + '/posts/' + post.id.to_s)
if post.created_at > Date.current - 7.days
	json.creation_date time_ago_in_words(post.created_at)
else
	json.creation_date post.created_at.to_formatted_s(:long)
end

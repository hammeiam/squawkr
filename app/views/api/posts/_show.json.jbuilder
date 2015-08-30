json.(post, :id, :created_at, :twitter_url)
json.post_title h(post.post_title)
json.post_body simple_format(post.post_body).gsub(URI.regexp(['http','https']), '<a href="\0">\0</a>').html_safe
json.link ('#u/' + post.user.username + '/posts/' + post.id.to_s)
if post.created_at > Date.current - 7.days
	json.creation_date time_ago_in_words(post.created_at) + ' ago'
else
	json.creation_date post.created_at.to_formatted_s(:short_ordinal)
end

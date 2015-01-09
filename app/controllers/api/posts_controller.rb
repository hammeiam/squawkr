module Api
	class PostsController < ApiController
		def show
			@post = Post.find(params[:id])
		end

		def index
			@posts = User.find_by_username(params[:user_username]).posts.all
		end

		def create
			
			if signed_in?
        @post = current_user.posts.new(
        	post_title: post_params[:post_title], 
        	post_body: post_params[:post_body])

        if @post.save
        	post_url = api_user_post_url(current_user, @post)

	        data = {
	        	image: post_params[:image_data],
	        	title: post_params[:post_title],
	        	body: post_params[:post_body],
	  				post_url: post_url
	        }
	        sent_tweet = current_user.tweet(data)
	        
	        @post.update({
	        	tweet_uid: sent_tweet.id,
	        	twitter_url: sent_tweet.url.to_s
	        	})

	        # redirect_to root_url, :notice => "I tweeted that."
	        render json: { success: sent_tweet.url }
	      else
	      	render json: { errors: @post.errors.full_messages }
	      end
      else
        redirect_to root_url, :notice => "Please log in first."
      end
		end

		def post_params
			params.require(:post).permit(:post_body, :post_title, :image_data)
		end
	end
end
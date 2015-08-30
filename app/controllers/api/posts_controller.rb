module Api
	class PostsController < ApiController
		def show
			@post = Post.find(params[:id])
		end

		def recent
			@posts = Post.all.order(id: :desc).limit(20) # pagination here
			render :index
		end

		def index
			@posts = User.find_by_username(params[:user_username]).posts.all.order(created_at: :desc)
		end

		def redirect_to_frontend
			redirect_string = "#notFound"
			if Post.exists?({id: params[:post_id]})
				@post = Post.find(params[:post_id])
				redirect_string = "#u/#{@post.user.username}/posts/#{params[:post_id]}"
			end
			redirect_to redirect_string
		end

		def create
			
			if signed_in?
        @post = current_user.posts.new(
        	post_title: post_params[:post_title], 
        	post_body: post_params[:post_body])

        if @post.save
        	post_url = root_url + 'p/' + @post.id.to_s

	        data = {
	        	image: post_params[:image_data],
	        	title: post_params[:post_title],
	        	body: post_params[:post_body],
	        	tags: post_params[:post_tags],
	  				post_url: post_url

	        }
	        sent_tweet = current_user.tweet(data)
	        
	        @post.update({
	        	tweet_uid: sent_tweet.id,
	        	twitter_url: sent_tweet.url.to_s
	        	})

	        # redirect_to root_url, :notice => "I tweeted that."
	        render json: { success: @post }
	      else
	      	render json: { errors: @post.errors.full_messages }
	      end
      else
        redirect_to root_url, :notice => "Please log in first."
      end
		end

		def destroy
			@post = Post.find(params[:id])
			@post.destroy
			render json: { success: @post }
		end

		def post_params
			params[:post][:post_tags] ||= []
			params.require(:post).permit(:post_body, :post_title, :image_data, post_tags:[])
		end
	end
end
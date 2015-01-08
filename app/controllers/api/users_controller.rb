module Api
  class UsersController < ApiController
  	def tweet
      if signed_in?
        # message = user_params[:tweet_body]
        post = current_user.posts.create(
        	post_title: user_params[:post_title], 
        	post_body: user_params[:post_body])

        post_url = api_user_post_url(current_user, post)

        data = {
        	image: user_params[:image_data],
        	title: user_params[:post_title],
        	body: user_params[:post_body],
  				post_url: post_url
        }
        
        current_user.tweet(data)
        
        redirect_to root_url, :notice => "I tweeted that."
        # if message.length > 0
        #   current_user.tweet(message)
        #   redirect_to root_url, :notice => "I tweeted that." 
        # else
        #   redirect_to root_url, :notice => "Uh, put some text there."
        # end
      else
        redirect_to root_url, :notice => "Please log in first."
      end
    end

    def show
      @user = User.find(params[:id])
    	@posts = @user.posts
    end

    def user_params
    	params.require(:user).permit(:post_body, :post_title, :image_data)
    end
  end
end
class UsersController < ApplicationController
	def tweet
    if signed_in?
      # message = user_params[:tweet_body]
      image_data = user_params[:image_data]
      current_user.tweet(image_data)
      current_user.posts.create(
      	post_title: user_params[:post_title], 
      	post_body: user_params[:post_body])
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

  def user_params
  	params.require(:user).permit(:post_body, :post_title, :image_data)
  end
end

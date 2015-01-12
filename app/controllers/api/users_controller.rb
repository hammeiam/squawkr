module Api
  class UsersController < ApiController
    def show
      @user = User.find_by_username(params[:username])
    	@posts = @user.posts
    end

    def index
      @users = User.all
    end

    def destroy
      if signed_in?
        user = current_user
        user.reset_session_token!
        user.destroy
        render json: { success: 'Account deleted' }
      else
        render json: { errors: ['Must be signed in to delete account'] }
      end
    end

    def user_params
    	params.require(:user).permit(:post_body, :post_title, :image_data)
    end
  end
end
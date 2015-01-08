class SessionsController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    @user = User.find_by_uid(auth["uid"]) || User.create_with_omniauth(auth)
    login(@user)
    # render json: { success: @user.id }
    redirect_to root_url
  end
  
  def destroy
    id = current_user.id
    current_user.reset_session_token!
    session[:session_token] = nil
    render json: { success: id }
  end
end

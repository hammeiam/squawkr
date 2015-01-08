class SessionsController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    user = User.find_by_uid(auth["uid"]) || User.create_with_omniauth(auth)
    login(user)
    redirect_to root_url, :notice => "Signed in!"
  end
  
  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to root_url, :notice => "Signed out!"
  end
end

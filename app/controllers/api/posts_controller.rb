class Api::PostsController < Api::ApiController
	def show
		@post = Post.find(params[:id])
	end

	def index
		@posts = User.find(params[:user_id]).posts
	end

end

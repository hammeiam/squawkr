class Post < ActiveRecord::Base
	validates :post_body, :post_title, :user_id, presence: true
	belongs_to :user
end

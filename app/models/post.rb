# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  post_body  :text             not null
#  post_title :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Post < ActiveRecord::Base
	validates :post_body, :post_title, :user_id, presence: true
	belongs_to :user
end

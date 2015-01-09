# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  uid           :string(255)      not null
#  name          :string(255)
#  username      :string(255)
#  token         :string(255)      not null
#  secret        :string(255)      not null
#  created_at    :datetime
#  updated_at    :datetime
#  image_url     :string(255)
#  description   :string(255)
#  twitter_url   :string(255)      not null
#  session_token :string(255)      not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

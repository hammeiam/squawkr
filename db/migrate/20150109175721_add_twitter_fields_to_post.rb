class AddTwitterFieldsToPost < ActiveRecord::Migration
  def change
  	add_column :posts, :twitter_url, :string
  	add_column :posts, :tweet_uid, :integer, limit: 8
  end
end

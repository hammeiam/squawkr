class ChangeUsersTableWithUsernameAndAuth < ActiveRecord::Migration
  def change
  	add_column :users, :image_url, :string
  	add_column :users, :description, :string
  	add_column :users, :twitter_url, :string, { null: false }
  	add_column :users, :session_token, :string, { null: false }
  	rename_column :users, :nickname, :username
  end
end

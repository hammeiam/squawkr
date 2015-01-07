class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
    	t.integer :user_id, null: false
    	t.text :post_body, null: false
    	t.string :post_title, null: false
      t.timestamps
    end
    add_index :posts, :user_id
  end
end

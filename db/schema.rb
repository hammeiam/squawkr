# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150108044218) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "posts", force: true do |t|
    t.integer  "user_id",    null: false
    t.text     "post_body",  null: false
    t.string   "post_title", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "uid",           null: false
    t.string   "name"
    t.string   "username"
    t.string   "token",         null: false
    t.string   "secret",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_url"
    t.string   "description"
    t.string   "twitter_url",   null: false
    t.string   "session_token", null: false
  end

  add_index "users", ["uid"], name: "index_users_on_uid", using: :btree

end

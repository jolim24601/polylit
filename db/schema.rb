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

ActiveRecord::Schema.define(version: 20160128022443) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.text     "description"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "pen_name",        null: false
  end

  add_index "authors", ["email"], name: "index_authors_on_email", unique: true, using: :btree
  add_index "authors", ["pen_name"], name: "index_authors_on_pen_name", using: :btree
  add_index "authors", ["session_token"], name: "index_authors_on_session_token", unique: true, using: :btree
  add_index "authors", ["username"], name: "index_authors_on_username", unique: true, using: :btree

  create_table "stories", force: :cascade do |t|
    t.integer  "author_id",                  null: false
    t.string   "title"
    t.string   "subtitle"
    t.boolean  "published",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.json     "node",                       null: false
    t.integer  "wordcount",                  null: false
  end

  add_index "stories", ["author_id"], name: "index_stories_on_author_id", using: :btree
  add_index "stories", ["title"], name: "index_stories_on_title", using: :btree

end

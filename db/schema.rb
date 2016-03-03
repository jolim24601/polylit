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

ActiveRecord::Schema.define(version: 20160303201907) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: :cascade do |t|
    t.string   "username",                        null: false
    t.string   "email",                           null: false
    t.string   "password_digest",                 null: false
    t.text     "description"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "pen_name",                        null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "provider"
    t.string   "uid"
    t.integer  "following_count",     default: 0, null: false
  end

  add_index "authors", ["email"], name: "index_authors_on_email", unique: true, using: :btree
  add_index "authors", ["pen_name"], name: "index_authors_on_pen_name", using: :btree
  add_index "authors", ["provider", "uid"], name: "index_authors_on_provider_and_uid", unique: true, using: :btree
  add_index "authors", ["provider"], name: "index_authors_on_provider", using: :btree
  add_index "authors", ["uid"], name: "index_authors_on_uid", using: :btree
  add_index "authors", ["username"], name: "index_authors_on_username", unique: true, using: :btree

  create_table "bookmarks", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.integer  "story_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "bookmarks", ["author_id", "story_id"], name: "index_bookmarks_on_author_id_and_story_id", using: :btree
  add_index "bookmarks", ["author_id"], name: "index_bookmarks_on_author_id", using: :btree
  add_index "bookmarks", ["story_id"], name: "index_bookmarks_on_story_id", using: :btree

  create_table "favorites", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.integer  "story_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "favorites", ["author_id"], name: "index_favorites_on_author_id", using: :btree
  add_index "favorites", ["story_id", "author_id"], name: "index_favorites_on_story_id_and_author_id", using: :btree
  add_index "favorites", ["story_id"], name: "index_favorites_on_story_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "follower_id",     null: false
    t.integer  "followable_id",   null: false
    t.string   "followable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "follows", ["followable_type", "followable_id"], name: "index_follows_on_followable_type_and_followable_id", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_token", null: false
    t.integer  "author_id",     null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree

  create_table "stories", force: :cascade do |t|
    t.integer  "author_id",                           null: false
    t.string   "title"
    t.string   "subtitle"
    t.boolean  "published",           default: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.json     "node",                                null: false
    t.integer  "wordcount",                           null: false
    t.string   "banner_file_name"
    t.string   "banner_content_type"
    t.integer  "banner_file_size"
    t.datetime "banner_updated_at"
    t.integer  "favorites_count"
  end

  add_index "stories", ["author_id"], name: "index_stories_on_author_id", using: :btree
  add_index "stories", ["title"], name: "index_stories_on_title", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",        null: false
    t.integer  "taggable_id",   null: false
    t.string   "taggable_type", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["taggable_type", "taggable_id"], name: "index_taggings_on_taggable_type_and_taggable_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["name"], name: "index_tags_on_name", using: :btree

  add_foreign_key "bookmarks", "stories"
  add_foreign_key "favorites", "stories"
end

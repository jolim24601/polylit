json.partial! "api/tags/tag", tag: @tag
json.follows   @tag.follows
json.followers @tag.followers

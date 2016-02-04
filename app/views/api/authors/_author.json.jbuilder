json.id           author.id
json.name         author.pen_name
json.url          '#/authors/' + author.id.to_s
json.description  author.description
json.following    0
json.followers    0
json.avatar       asset_url(author.avatar.url(:small))

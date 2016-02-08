json.id                 author.id
json.username           author.username
json.name               author.pen_name
json.url                '#/authors/' + author.id.to_s
json.description        author.description
json.follows            author.follows
json.avatar             asset_url(author.avatar.url)
json._type              "Author"
json.followingCount     Follow.where(follower_id: author.id).count

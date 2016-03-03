json.id                 author.id
json.username           author.username
json.name               author.pen_name
json.url                '#/authors/' + author.id.to_s
json.description        author.description
json.follows            author.follows

# check if it's default
if author.avatar.url == 'avatar.png'
  json.avatar asset_url(author.avatar.url)
else
  json.avatar "http://res.cloudinary.com/polylit/image/upload/w_100,h_100/remote_media/#{asset_url(author.avatar.url).gsub!(/.*?(?=authors)/im, "")}"
end

json._type              "Author"
json.followingCount     author.following_count

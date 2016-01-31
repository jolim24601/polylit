Author.destroy_all

george_eliot = Author.create(
  username: "george_eliot",
  email: "ge@example.com",
  pen_name: "George Eliot",
  description: "Novelist, journalist, translator, author of seven works of fiction.",
  password: "adambede123"
)

leo_tolstoy = Author.create(
  username: "leo_tolstoy",
  pen_name: "Leo Tolstoy",
  email: "leo@example.com",
  description: "Everyone thinks of changing the world, but no one thinks of changing himself.",
  password: "annakarenina123"
)

salman_rushdie = Author.create(
  username: "salman_rushdie",
  pen_name: "Salman Rushdie",
  email: "salman@rushdie.org",
  description: "A book is a version of the world.",
  password: "midnights12"
)

me = Author.create(
  username: "jolim",
  email: "jolim24601@gmail.com",
  pen_name: "JH LIM",
  description: "I code and I write.",
  password: "jupiter"
)

bradbury = Author.create(
  username: "ray",
  email: "ray@example.com",
  pen_name: "Ray Bradbury",
  description: "I burn books.",
  password: "fahrenheit451"
)

lydia = Author.create(
  username: "lydia",
  email: "lydia@example.com",
  pen_name: "Lydia Davis",
  description: "Flash fiction writer, recently translated Marcel Proust's Swann's Way.",
  password: "lydiadavis"
)

Tag.destroy_all

love = Tag.create(name: "Love")
sex = Tag.create(name: "Sex")
money = Tag.create(name: "Money")
music = Tag.create(name: "Music")
selfhelp = Tag.create(name: "Self-help")
christianity = Tag.create(name: "Christianity")
zen = Tag.create(name: "Zen")
wellbeing = Tag.create(name: "Wellbeing")
art = Tag.create(name: "Art")
family = Tag.create(name: "Family")
winter = Tag.create(name: "Winter")
gameofthrones = Tag.create(name: "Game of Thrones")
film = Tag.create(name: "Film")
newyork = Tag.create(name: "New York")
soccer = Tag.create(name: "Soccer")
food = Tag.create(name: "Food")
friends = Tag.create(name: "Friendship")
code = Tag.create(name: "Code")
prog = Tag.create(name: "Programming")
frenchlit = Tag.create(name: "French Literature")
russlit = Tag.create(name: "Russian Literature")
americana = Tag.create(name: "Americana")
politics = Tag.create(name: "Politics")
history = Tag.create(name: "History")
lives = Tag.create(name: "Black Lives Matter")
guns = Tag.create(name: "Guns")
isis = Tag.create(name: "ISIS")

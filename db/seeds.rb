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
  password: "jupiter3"
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

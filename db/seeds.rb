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

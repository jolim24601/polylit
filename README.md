# Polylit
[Live][live]
[live]: http://www.polylit.net

[![Screenshot](/docs/polylit_home_page.png)](http://www.polylit.net)


# Summary
Polylit is a web application inspired by Medium built using Ruby on Rails
and React.js. Authors can read, write and edit stories using the WYSIWYG
rich text editor built on top of Marijn Haverbeke's Prosemirror API.

# Languages
- Javascript
- Ruby

# Frameworks
- React
- Rails

# Libraries

- [Prosemirror](http://prosemirror.net)
- [jQuery](http://jquery.com)
- [Flux](https://facebook.github.io/flux)
- [React router](https://github.com/rackt/react-router)
- [bcrypt](https://github.com/codahale/bcrypt-ruby)
- [paperclip](https://github.com/thoughtbot/paperclip)
- [kaminari](https://github.com/amatsuda/kaminari)
- [pg_search](https://github.com/Casecommons/pg_search)
- [jbuilder](https://github.com/rails/jbuilder)
- [font awesome rails](https://github.com/bokmann/font-awesome-rails)
- [AWS SDK](https://github.com/aws/aws-sdk-rails)
- [omniauth fb](https://github.com/mkdynamic/omniauth-facebook)
- [omniauth twitter](https://github.com/arunagw/omniauth-twitter)

# Features
- Login using Twitter or FB
- Periodic auto-save of stories, which automatically go into a drafts folder
- Infinite scrolling on the home page
- View any profile and on-the-spot editing of profile for account owners.
- Tag, favorite, and bookmark stories as well as search for stories by tag, author, or title
- Style stories using the tooltip menu that appears after highlighting content
- Insert images and gifs into your stories. Your first image will auto-save as the banner image for the index show page.

## Design Docs
* [DB schema][schema]
* [Views][views]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Roadmap

- [x] Sign up/Log in by email, twitter, or FB
- [x] Create, read, edit, and delete Stories
- [x] Write their stories using a sophisticated WYSIWYG rich text editor
- [x] Tag stories with multiple tags and search stories by tag
- [x] Bookmark and favorite stories
- [x] Follow other authors
- [x] Pagination / infinite scroll
- [ ] Receive notifications when people/pubs you follow post new content
- [ ] Create responses
- [ ] Keyboard shortcuts for styling stories
- [ ] Allow highlights, denote top highlighted sections

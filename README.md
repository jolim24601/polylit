# Polylit

[Heroku link][heroku] **NB:** Link forthcoming

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Polylit is a web application inspired by Medium built using Ruby on Rails
and React.js. Polylit allows authors to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete stories
- [ ] Create, read, edit, and delete responses
- [ ] Organize stories within Publications
- [ ] Tag stories with multiple tags and search stories by tag
- [ ] Bookmark and favorite stories
- [ ] Follow other authors and publications
- [ ] Write their stories using a sophisticated WYSIWYG rich text editor (TBD)
- [ ] Embed content directly into their stories (Embedly)

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Story Model and JSON API (1 day)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup with the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Stories.

[Details][phase-one]

### Phase 2: Flux Architecture and Story CRUD (1.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Story store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Stories `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Stories can be created, read, edited and destroyed in the browser. Stories should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start applying CSS/SASS for
styling.

[Details][phase-two]

### Phase 3: Publications, Tags, Favorites, Bookmarks (2 days)

Phase 3 adds organization to the Stories. Stories belong to a Publication, which
is linked to by the story (no index view.) Create JSON API for Publications.
Stories can also now be tagged with multiple tags, bookmarked, and favorited.
Authors can bring up stories in a separate `SearchIndex` view by searching for their tags.

[Details][phase-three]

### Phase 4: Polymorphic Follows (1 day)

Authors can follow other authors, as well as publications.

[Details][phase-four]

### Phase 5: Allow Complex Styling in Stories, embeddable content (1.5 days)

Using the Prosemirror (TBD) library, give users a tooltip menu for styling stories.
Authors can embed video, articles, tweets, etc. using the Embedly API.

[Details][phase-five]

### Phase 6: Auth styling and Seeding. Single page React authentication. (1 day)

Seed the DB with content and create React routes for single page authentication
with React. Style authentication flow.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Pagination / infinite scroll
- [ ] URL slugs using FriendlyId
- [ ] Keyboard shortcuts for styling stories
- [ ] Allow highlights, denote top highlighted sections, share highlights on FB/Twitter
- [ ] Real-time collaborative editing for stories using Prosemirror's collab module

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md

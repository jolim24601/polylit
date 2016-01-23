# Polylit

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Polylit is a web application inspired by Medium built using Ruby on Rails
and React.js. Polylit allows authors to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete stories
- [ ] Organize stories within Publications
- [ ] Tag stories with multiple tags and search stories by tag
- [ ] Follow other authors
- [ ] Apply a tooltip menu for styling text while editing
- [ ] Embed content directly into their stories
- [ ] Make private highlights and stories, and public comments on stories

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Note Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Stories.

[Details][phase-one]

### Phase 2: Flux Architecture and Note CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Story store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Stories `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Stories can be created, read, edited and destroyed in the browser. Stories should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start applying SASS for
styling.

[Details][phase-two]

### Phase 3: Publication and Tags (2 days)

Phase 3 adds organization to the Stories. Stories belong to a Publication, which has
its own `Index` view. Create JSON API for Publications. Stories can also now be
tagged with multiple tags. Authors can bring up stories in a separate `SearchIndex`
view by searching for their tags.

[Details][phase-three]

### Phase 4: Allow Complex Styling in Stories (1 day)

Using the react-quill library (based on Quill.js), allow for complex styling of
stories.

[Details][phase-four]

### Phase 5: Reminders and Garbage Collection (1 day)

Phase 5 introduces two new features. First, authors can set reminders on stories
which will at the time they are set for prompt the user to review and edit the
given note.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)


### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Use javascript library for cleaner tag selection
- [ ] Changelogs for Stories
- [ ] Pagination / infinite scroll for Stories Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

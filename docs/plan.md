
## Implementation Timeline

### Phase 1: Author Authentication, Story Model and JSON API (1 day)

In Phase 1, I will begin by implementing author signup and authentication (using
BCrypt). There will be a basic landing page after signup with the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Stories.

[Details][phase-one]

### Phase 2: Flux Architecture and Story CRUD (1.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Story store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Stories `Index`, `IndexItem` `Form`, and `View`. At the end of Phase 2,
Stories can be created, read, edited and destroyed in the browser. Stories should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start applying CSS/SASS for
styling.

[Details][phase-two]

### Phase 3: Tags (1 day)

Stories can also now be tagged with multiple tags, bookmarked, and favorited.
Authors can bring up stories in a separate `SearchIndex` view by searching for their tags.

[Details][phase-three]

### Phase 4: Publications (1 day)

Phase 3 adds organization to the Stories. Stories belong to a Publication, which
is linked to by the story (no index view.) Create JSON API for Publications.

### Phase 5: Favorites, Bookmarks (1 day)

Build a list component for favorited stories, aka recommendations authors can make,
and bookmarked stories. Similar functionality for both.

### Phase 7: Polymorphic Follows (~.5 days)

Authors can follow other authors, as well as publications.

[Details][phase-seven]

### Phase 8: Allow Complex Styling in Stories, embeddable content (1.5 days)

Using the Prosemirror (TBD) library, give users a tooltip menu for styling stories.
Authors can embed video, articles, tweets, etc. using the Embedly API.

[Details][phase-eight]

### Phase 9: Auth styling and Seeding. Single page React authentication. (1 day)

Seed the DB with content and create React routes for single page authentication
with React. Style authentication flow.

[Details][phase-nine]

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md

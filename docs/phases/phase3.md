### Phase 3: Publications, Tags, Favorites, Bookmarks (2 days)

## Rails
### Models
* Publication
* Tag
* Tagging
* Favorite
* Bookmark

### Controllers
* Api::PublicationsController (create, destroy, edit, show, update)
* Api::BookmarksController (create, destroy, index)
* Api::FavoriteController (create, destroy, index)
* Api::TagsController (create, destroy, index)
* Api::TaggingsController (create, destroy, index)

### Views
* publications/index.json.jbuilder
* publications/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* PublicationsIndex
  - PublicationIndexItem
* PublicationForm
* SearchIndex

### Stores
* Publication

### Actions
* ApiActions.receiveAllPublications -> triggered by ApiUtil
* ApiActions.receiveSinglePublication
* ApiActions.deletePublication
* PublicationActions.fetchAllPublications -> triggers ApiUtil
* PublicationActions.fetchSinglePublication
* PublicationActions.createPublication
* PublicationActions.editPublication
* PublicationActions.destroyPublication

### ApiUtil
* ApiUtil.fetchAllPublications
* ApiUtil.fetchSinglePublication
* ApiUtil.createPublication
* ApiUtil.editPublication
* ApiUtil.destroyPublication

## Gems/Libraries

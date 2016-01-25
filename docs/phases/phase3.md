# Phase 3: Publications and Tags (2 days)

## Rails
### Models
* Publication
* Tag
* Tagging

### Controllers
* Api::PublicationsController (create, destroy, index, show, update)

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

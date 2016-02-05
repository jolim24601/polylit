var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    AuthorConstants = require('../constants/author_constants'),
    objectAssign = require('object-assign');

var AuthorStore = new Store(AppDispatcher);
var _authors = {};

function resetAuthors(authors) {
  authors.forEach(function (author) {
    _authors[author.id] = author;
  });

}

function resetAuthor(author) {
  _authors[author.id] = author;
}

function updateAuthorFollows(follow) {
  var author = _authors[follow.followable_id];
  for (var i=0; i < author.follows.length; i++) {
    if (author.follows[i].id === follow.id) {
      author.follows.splice(i, 1);
      return;
    }
  }

  author.follows.push(follow);
}

function resetAuthorsFromStories(stories) {
  var authors = stories.map(function (story) {
    return story.author;
  });

  resetAuthors(authors);
}

AuthorStore.find = function (id) {
  return objectAssign({}, _authors[id]);
};

AuthorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case AuthorConstants.AUTHOR_RECEIVED:
    resetAuthor(payload.author);
    AuthorStore.__emitChange();
    break;
  case AuthorConstants.AUTHORS_RECEIVED:
    resetAuthors(payload.authors);
    AuthorStore.__emitChange();
    break;
  case AuthorConstants.AUTHOR_FOLLOW_RECEIVED:
    updateAuthorFollows(payload.follow);
    AuthorStore.__emitChange();
    break;
  case AuthorConstants.AUTHOR_STORIES_RECEIVED:
    resetAuthorsFromStories(payload.stories);
    AuthorStore.__emitChange();
    break;
  default:
    // do nothing
  }
};

module.exports = AuthorStore;

var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    AuthorConstants = require('../constants/author_constants'),
    objectAssign = require('object-assign');

var AuthorStore = new Store(AppDispatcher);
var _authors = {};

function resetAuthors(authors) {
  _authors = authors;
}

function resetAuthor(author) {
  _authors[author.id] = author;
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
  default:
    // do nothing
  }
};

module.exports = AuthorStore;

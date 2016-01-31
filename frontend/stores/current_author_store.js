var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    CurrentAuthorConstants = require('../constants/current_author_constants'),
    objectAssign = require('object-assign');

var CurrentAuthorStore = new Store(AppDispatcher),
    _currentAuthor = {},
    _currentAuthorFetched = false;

CurrentAuthorStore.currentAuthor = function () {
  return objectAssign({}, _currentAuthor);
};

CurrentAuthorStore.isLoggedIn = function () {
  return !!_currentAuthor.id;
};

CurrentAuthorStore.currentAuthorFetched = function () {
  return _currentAuthorFetched;
};

CurrentAuthorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case CurrentAuthorConstants.RECEIVE_CURRENT_AUTHOR:
    _currentAuthorFetched = true;
    _currentAuthor = payload.currentAuthor;
    CurrentAuthorStore.__emitChange();
    break;
  case CurrentAuthorConstants.DESTROY_CURRENT_AUTHOR:
    _currentAuthor = {};
    CurrentAuthorStore.__emitChange();
    break;
  default:
  // do nothing
  }
};

module.exports = CurrentAuthorStore;

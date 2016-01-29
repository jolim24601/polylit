var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    CurrentUserConstants = require('../constants/current_user_constants'),
    objectAssign = require('object-assign');

var CurrentUserStore = new Store(AppDispatcher),
    _currentUser = {},
    _currentUserFetched = false;

CurrentUserStore.currentUser = function () {
  return objectAssign({}, _currentUser);
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.currentUserFetched = function () {
  return _currentUserFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case CurrentUserConstants.RECEIVE_CURRENT_USER:
    _currentUserFetched = true;
    _currentUser = payload.currentUser;
    CurrentUserStore.__emitChange();
    break;
  default:
  // do nothing
  }
};

module.exports = CurrentUserStore;

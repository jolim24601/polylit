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

function destroyStory(story) {
  var stories = _currentAuthor.stories;
  for (var i=0; i < stories.length; i++) {
    if (stories[i].id === story.id) {
      stories.splice(i, 1);
      break;
    }
  }
}

function updateFollows(follow) {
  for (var i=0; i < _currentAuthor.follows.length; i++) {
    if (_currentAuthor.follows[i].id === follow.id) {
      _currentAuthor.follows.splice(i, 1);
      return;
    }
  }

  _currentAuthor.follows.push(follow);
}

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
  case CurrentAuthorConstants.LOSE_STORY:
    destroyStory(payload.story);
    CurrentAuthorStore.__emitChange();
    break;
  case CurrentAuthorConstants.FOLLOW_RECEIVED:
    updateFollows(payload.follow);
    CurrentAuthorStore.__emitChange();
    break;
  default:
  // do nothing
  }
};

module.exports = CurrentAuthorStore;

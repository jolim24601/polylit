var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    StoreConstants = require('../constants/store_constants');

var StoryStore = new Store(AppDispatcher);
var _stories = [];

function resetStories(stories) {
  _stories = stories;
}

StoryStore.all = function () {
  return _stories.slice();
};

StoryStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case StoreConstants.STORIES_RECEIVED:
    resetStories(payload.stories);
    break;
    default:
    // do nothing
  }
};

module.exports = StoryStore;

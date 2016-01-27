var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    StoryConstants = require('../constants/story_constants');

var StoryStore = new Store(AppDispatcher);
var _stories = [];

function resetStories(stories) {
  _stories = stories;
}

function addStory(story) {
  _stories.shift(story);
}

StoryStore.all = function () {
  return _stories.slice();
};

StoryStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case StoryConstants.STORIES_RECEIVED:
    resetStories(payload.stories);
    StoryStore.__emitChange();
    break;
  case StoryConstants.STORY_RECEIVED:
    addStory(payload.story);
    StoryStore.__emitChange();
    break;
  default:
    // do nothing
  }
};

module.exports = StoryStore;

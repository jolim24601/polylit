var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    StoryConstants = require('../constants/story_constants'),
    objectAssign = require('object-assign');

var StoryStore = new Store(AppDispatcher);
var _stories = {};

function resetStories(stories) {
  _stories = {};
  stories.forEach(function (story) {
    _stories[story.id] = story;
  });
}

function resetStory(story) {
  _stories[story.id] = story;
}

StoryStore.all = function () {
  return objectAssign({}, _stories);
};

StoryStore.find = function (id) {
  return objectAssign({}, _stories[id]);
};

StoryStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case StoryConstants.STORIES_RECEIVED:
    resetStories(payload.stories);
    StoryStore.__emitChange();
    break;
  case StoryConstants.STORY_RECEIVED:
    resetStory(payload.story);
    StoryStore.__emitChange();
    break;
  default:
    // do nothing
  }
};

module.exports = StoryStore;

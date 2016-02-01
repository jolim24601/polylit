var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    StoryConstants = require('../constants/story_constants');

var StoryStore = new Store(AppDispatcher);
var _stories = [];

function resetStories(stories) {
  _stories = stories;
}

function resetStory(story) {
  var oldStory = StoryStore.find(story.id);
  if (oldStory) {
    oldStory = story;
  } else {
    _stories.push(story);
  }
}

StoryStore.all = function () {
  return _stories.slice();
};

StoryStore.find = function (id) {
  for (var i=0; i < _stories.length; i++) {
    if (_stories[i].id === id) { return _stories[i]; }
  }
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

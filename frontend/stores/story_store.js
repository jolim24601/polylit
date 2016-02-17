var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    StoryConstants = require('../constants/story_constants');

var StoryStore = new Store(AppDispatcher);
var _stories = [],
    _topStories = [],
    _followedStories =[];

function resetStories(stories) {
  _stories = stories;
}

function resetFollowedStory(story) {
  for (var i=0; i < _followedStories.length; i++) {
    if (_followedStories[i].id === parseInt(story.id, 10)) {
      _followedStories[i] = story;
      break;
    }
  }
}

function resetTopStory(story) {
  for (var i=0; i < _topStories.length; i++) {
    if (_topStories[i].id === parseInt(story.id, 10)) {
      _topStories[i] = story;
      break;
    }
  }
}

function resetStory(story) {
  var oldStory = StoryStore.find(story.id);
  if (oldStory) {
    var idx = _stories.indexOf(oldStory);
    _stories[idx] = story;
  } else {
    _stories.push(story);
  }
}

StoryStore.all = function () {
  return _stories.slice();
};

StoryStore.topStories = function () {
  return _topStories.slice();
};

StoryStore.followedStories = function () {
  return _followedStories.slice();
};

StoryStore.find = function (id) {
  for (var i=0; i < _stories.length; i++) {
    if (_stories[i].id === parseInt(id, 10)) {
      return _stories[i];
    }
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
    resetTopStory(payload.story);
    resetFollowedStory(payload.story);
    StoryStore.__emitChange();
    break;
  case StoryConstants.TOP_STORIES_RECEIVED:
    _topStories = payload.stories;
    StoryStore.__emitChange();
    break;
  case StoryConstants.FOLLOWED_STORIES_RECEIVED:
    _followedStories = payload.stories;
    StoryStore.__emitChange();
    break;
  default:
    // do nothing
  }
};

module.exports = StoryStore;

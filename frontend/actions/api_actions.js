var AppDispatcher = require('../dispatcher/dispatcher'),
    StoryConstants = require('../constants/story_constants');

module.exports = {
  receiveSingleStory: function (story) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORY_RECEIVED,
      story: story
    });
  },
  receiveTopStories: function (stories) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORIES_RECEIVED,
      stories: stories
    });
  }
};

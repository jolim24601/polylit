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
      actionType: StoryConstants.TOP_STORIES_RECEIVED,
      stories: stories
    });
  },
  receiveLatestStories: function (stories) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORIES_RECEIVED,
      stories: stories
    });
  },
  receiveAuthorStories: function (stories) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORIES_RECEIVED,
      stories: stories
    });
  },
  receiveStoriesByTag: function (stories) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORIES_RECEIVED,
      stories: stories
    });
  },
  receiveBookmarkedStories: function (stories) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORIES_RECEIVED,
      stories: stories
    });
  },
  receiveFollowedStories: function (stories) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.FOLLOWED_STORIES_RECEIVED,
      stories: stories
    });
  },
  destroyStory: function (story) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORY_DESTROYED,
      story: story
    });
  },
  updateStoryFavorites: function (story) {
    AppDispatcher.dispatch({
      actionType: StoryConstants.STORY_RECEIVED,
      story: story
    });
  }
};

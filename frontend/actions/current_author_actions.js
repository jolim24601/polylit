var CurrentAuthorConstants = require('../constants/current_author_constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveCurrentAuthor: function (author) {
    AppDispatcher.dispatch({
      actionType: CurrentAuthorConstants.RECEIVE_CURRENT_AUTHOR,
      currentAuthor: author
    });
  },
  destroyCurrentAuthor: function (author) {
    AppDispatcher.dispatch({
      actionType: CurrentAuthorConstants.DESTROY_CURRENT_AUTHOR
    });
  },
  loseStory: function (story) {
    AppDispatcher.dispatch({
      actionType: CurrentAuthorConstants.LOSE_STORY,
      story: story
    });
  },
  updateFollow: function (follow) {
    AppDispatcher.dispatch({
      actionType: CurrentAuthorConstants.FOLLOW_RECEIVED,
      follow: follow
    });
  }
};

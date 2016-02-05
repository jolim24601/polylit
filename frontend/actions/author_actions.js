var AuthorConstants = require('../constants/author_constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveAuthor: function (author) {
    AppDispatcher.dispatch({
      actionType: AuthorConstants.AUTHOR_RECEIVED,
      author: author
    });
  },
  updateFollow: function (follow) {
    AppDispatcher.dispatch({
      actionType: AuthorConstants.AUTHOR_FOLLOW_RECEIVED,
      follow: follow
    });
  },
  receiveAuthorsFromStories: function (stories) {
    AppDispatcher.dispatch({
      actionType: AuthorConstants.AUTHOR_STORIES_RECEIVED,
      stories: stories
    });
  }
};

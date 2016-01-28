var AuthorConstants = require('../constants/author_constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveAuthor: function (author) {
    AppDispatcher.dispatch({
      actionType: AuthorConstants.AUTHOR_RECEIVED,
      author: author
    });
  }
};

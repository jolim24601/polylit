var CurrentAuthorConstants = require('../constants/current_author_constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveCurrentAuthor: function (author) {
    AppDispatcher.dispatch({
      actionType: CurrentAuthorConstants.RECEIVE_CURRENT_AUTHOR,
      currentAuthor: author
    });
  }
};

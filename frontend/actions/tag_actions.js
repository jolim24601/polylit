var TagConstants = require('../constants/tag_constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveTags: function (tags) {
    AppDispatcher.dispatch({
      actionType: TagConstants.TAGS_RECEIVED,
      tags: tags
    });
  },
  receiveTopTags: function (tags) {
    AppDispatcher.dispatch({
      actionType: TagConstants.TOP_TAGS_RECEIVED,
      tags: tags
    });
  }
};

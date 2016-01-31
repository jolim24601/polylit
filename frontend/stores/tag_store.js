var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    TagConstants = require('../constants/tag_constants');

var TagStore = new Store(AppDispatcher),
    _tags = [];

TagStore.__onDispatch = function (payload) {
  if (payload.actionType ===  TagConstants.TAGS_RECEIVED) {
    _tags = payload.tags;
    TagStore.__emitChange();
  }
};

module.exports = TagStore;

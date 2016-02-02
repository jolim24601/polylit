var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    TagConstants = require('../constants/tag_constants');

var TagStore = new Store(AppDispatcher),
    _tags = [],
    _topTags = [];

TagStore.all = function () {
  return _tags.slice();
};

TagStore.topTags = function () {
  return _topTags.slice();
};

TagStore.__onDispatch = function (payload) {
  if (payload.actionType ===  TagConstants.TAGS_RECEIVED) {
    _tags = payload.tags;
    TagStore.__emitChange();
  } else if (payload.actionType === TagConstants.TOP_TAGS_RECEIVED) {
    _topTags = payload.tags;
    TagStore.__emitChange();
  }
};

module.exports = TagStore;

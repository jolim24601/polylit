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

TagStore.find = function (name) {
  for (var i=0; i < _tags.length; i++) {
    if (_tags[i].name === name) {
      return _tags[i];
    }
  }
};

TagStore.findById = function (id) {
  for (var i=0; i < _tags.length; i++) {
    if (_tags[i].id === id) {
      return _tags[i];
    }
  }
};

function resetTag (tag) {
  for (var i=0; i < _tags.length; i++) {
    if (_tags[i].id === tag.id) {
      _tags[i] = tag;
      break;
    }
  }
}

// if follow exists, delete it, else add it.
function updateTagFollows(follow) {
  var tag = TagStore.findById(follow.followable_id);
  var followsIds = tag.follows.map(function (f) { return f.id; });
  for (var i=0; i < tag.follows.length; i++) {
    if (tag.follows[i].id === follow.id) {
      tag.follows.splice(i, 1);
      return;
    }
  }

  tag.follows.push(follow);
}

TagStore.__onDispatch = function (payload) {
  if (payload.actionType ===  TagConstants.TAGS_RECEIVED) {
    _tags = payload.tags;
    TagStore.__emitChange();
  } else if (payload.actionType === TagConstants.TOP_TAGS_RECEIVED) {
    _topTags = payload.tags;
    TagStore.__emitChange();
  } else if (payload.actionType === TagConstants.TAG_RECEIVED) {
    resetTag(payload.tag);
    TagStore.__emitChange();
  } else if (payload.actionType === TagConstants.TAG_FOLLOW_RECEIVED) {
    updateTagFollows(payload.follow);
    TagStore.__emitChange();
  }
};

module.exports = TagStore;

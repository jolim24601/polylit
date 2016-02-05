var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher');

var CustomFeedStore = new Store(AppDispatcher),
    CustomFeedConstants = require('../../constants/custom_feed_constants'),
    _stories = [];

CustomFeedStore.all = function () {
  return _stories.slice();
};

CustomFeedStore.__onDispatch = function (payload) {

};

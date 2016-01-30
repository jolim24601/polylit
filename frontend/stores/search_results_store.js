var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    SearchConstants = require('../constants/search_constants'),
    objectAssign = require('object-assign');

var SearchResultsStore = new Store(AppDispatcher),
    _searchResults = {},
    _meta = {};

SearchResultsStore.all = function () {
  return objectAssign({}, _searchResults);
};

SearchResultsStore.meta = function () {
  return objectAssign({}, _meta);
};

SearchResultsStore.stories = function () {
  return _searchResults.stories.slice();
};

SearchResultsStore.tags = function () {
  return _searchResults.tags.slice();
};

SearchResultsStore.authors = function () {
  return _searchResults.authors.slice();
};

function resetSearchResults(results) {
  Object.keys(results).forEach(function (k) {
    _searchResults[k] = results[k];
  });
}

SearchResultsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case SearchConstants.RECEIVE_SEARCH_RESULTS:
    resetSearchResults(payload.results);
    _meta = payload.meta;
    SearchResultsStore.__emitChange();
    break;
  default:
  // do nothing
  }
};

module.exports = SearchResultsStore;

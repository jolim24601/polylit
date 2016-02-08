var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    SearchConstants = require('../constants/search_constants'),
    objectAssign = require('object-assign');

var SearchResultsStore = new Store(AppDispatcher),
    _searchResults = { 'Story': [], 'Tag': [], 'Author': [] };

SearchResultsStore.all = function () {
  return objectAssign({}, _searchResults);
};

SearchResultsStore.stories = function () {
  return _searchResults.Story.slice();
};

SearchResultsStore.tags = function () {
  return _searchResults.Tag.slice();
};

SearchResultsStore.authors = function () {
  return _searchResults.Author.slice();
};

function resetSearchResults(results) {
  // Have a catch-all for unexpected results
  _searchResults = { 'Story': [], 'Tag': [], 'Author': [], 'MISC': [] };
  results.forEach(function (result) {
    _searchResults[result._type].push(result);
  });
}

SearchResultsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case SearchConstants.RECEIVE_SEARCH_RESULTS:
    resetSearchResults(payload.results);
    SearchResultsStore.__emitChange();
    break;
  default:
  // do nothing
  }
};

module.exports = SearchResultsStore;

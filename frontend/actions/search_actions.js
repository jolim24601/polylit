var SearchConstants = require('../constants/search_constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveResults: function(data) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      results: data.results
    });
  }
};

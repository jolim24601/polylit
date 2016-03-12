var SearchActions = require('../actions/search_actions'),
    reqwest = require('reqwest');

module.exports = {
  search: function (query, type) {
    reqwest({
      method: "GET",
      url: "/api/search",
      type: "json",
      data: { query: query, type: type },
      success: function (data) {
        SearchActions.receiveResults(data);
      }
    });
  }
};

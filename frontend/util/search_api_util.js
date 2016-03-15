var SearchActions = require('../actions/search_actions'),
    request = require('reqwest');

module.exports = {
  search: function (query, type) {
    request({
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

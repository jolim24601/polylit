var SearchActions = require('../actions/search_actions'),
    qwest = require('qwest');

module.exports = {
  search: function (query, type) {
    qwest.get("/api/search", { query: query, type: type })
         .then(function (xhr, response) {
           SearchActions.receiveResults(response);
         });
  }
};

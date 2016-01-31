var SearchActions = require('../actions/search_actions');

module.exports = {
  search: function (query, page, type) {
    $.ajax({
      type: "GET",
      url: "/api/search",
      dataType: "json",
      data: { query: query, page: page, type: type },
      success: function (data) {
        SearchActions.receiveResults(data);
      }
    });
  }
};

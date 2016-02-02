var CurrentAuthorActions = require('../actions/current_author_actions');

module.exports = {
  fetchCurrentAuthor: function (callback) {
    $.ajax({
      type: "GET",
      url: "api/session",
      dataType: "json",
      success: function (author) {
        CurrentAuthorActions.receiveCurrentAuthor(author);
        if (typeof callback === "function") { callback(); }
      }
    });
  },
  loginAuthor: function (credentials, callback) {
    $.ajax({
      type: "POST",
      url: "api/session",
      dataType: "json",
      data: { author: credentials },
      success: function (author) {
        CurrentAuthorActions.receiveCurrentAuthor(author);
        callback && callback();
      }
    });
  },
  logoutAuthor: function (callback) {
    $.ajax({
      type: "DELETE",
      url: "api/session",
      success: function () {
        callback && callback();
      }
    });
  }
};

var CurrentAuthorActions = require('../actions/current_author_actions'),
    FlashActions = require('../actions/flash_actions'),
    reqwest = require('reqwest');

module.exports = {
  fetchCurrentAuthor: function (callback) {
    reqwest({
      method: "GET",
      url: "api/session",
      type: "json",
      success: function (author) {
        CurrentAuthorActions.receiveCurrentAuthor(author);
        if (typeof callback === "function") { callback(); }
      }
    });
  },
  loginAuthor: function (credentials, callback) {
    reqwest({
      method: "POST",
      url: "api/session",
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      data: { author: credentials },
      success: function (author) {
        CurrentAuthorActions.receiveCurrentAuthor(author);
        callback && callback();
      },
      error: function (flash) {
        FlashActions.updateFlash(flash);
      }
    });
  },
  logoutAuthor: function (callback) {
    reqwest({
      method: "DELETE",
      url: "api/session",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function () {
        callback && callback();
      }
    });
  }
};

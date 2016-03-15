var CurrentAuthorActions = require('../actions/current_author_actions'),
    FlashActions = require('../actions/flash_actions'),
    request = require('reqwest');

module.exports = {
  fetchCurrentAuthor: function (callback) {
    request({
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
    request({
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
    request({
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

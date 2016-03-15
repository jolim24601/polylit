var CurrentAuthorActions = require('../actions/current_author_actions'),
    FlashActions = require('../actions/flash_actions'),
    qwest = require('qwest');

module.exports = {
  fetchCurrentAuthor: function (callback) {
    qwest.get("api/session")
         .then(function (xhr, response) {
           CurrentAuthorActions.receiveCurrentAuthor(response);
           if (typeof callback === "function") { callback(); }
         });
  },
  loginAuthor: function (credentials, callback) {
    qwest.post("api/session", { author: credentials })
         .then(function (xhr, response) {
           CurrentAuthorActions.receiveCurrentAuthor(response);
           callback && callback();
         })
         .catch(function (e, xhr, response) {
           FlashActions.updateFlash(response);
         });
  },
  logoutAuthor: function (callback) {
    qwest.map("DELETE", "api/session")
         .then(function (xhr, response) {
           callback && callback();
         });
  }
};

var TagActions = require('../actions/tag_actions'),
    qwest = require('qwest');

module.exports = {
  createTags: function (data, callback) {
    qwest.post("api/tags", data)
         .then(function (xhr, response) {
           TagActions.receiveTags(response);
           callback && callback();
         });
  },
  destroyTagging: function (data, callback) {
    qwest.map("DELETE", "api/taggings", data)
         .then(function (xhr, response) {
           callback && callback(response);
         });
  },
  createTagging: function (data, callback) {
    qwest.post("api/taggings", data)
         .then(function (xhr, response) {
           callback && callback(response);
         });
  },
  fetchTopTags: function (callback) {
    qwest.get("api/tags/top-tags")
         .then(function (xhr, response) {
           TagActions.receiveTopTags(response);
           callback && callback();
         });
  },
  fetchTagDetails: function (data, callback) {
    qwest.get("api/tags/" + data)
         .then(function (xhr, response) {
           TagActions.receiveTag(response);
           callback && callback(response);
         });
  }
};

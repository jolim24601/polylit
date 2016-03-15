var TagActions = require('../actions/tag_actions'),
    request = require('reqwest');

module.exports = {
  createTags: function (data, callback) {
    request({
      method: "POST",
      url: "api/tags",
      data: data,
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (tags) {
        TagActions.receiveTags(tags);
        callback && callback();
      }
    });
  },
  destroyTagging: function (data, callback) {
    request({
      method: "DELETE",
      url: "api/taggings",
      data: data,
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (taggable) {
        callback && callback(taggable);
      }
    });
  },
  createTagging: function (data, callback) {
    request({
      method: "POST",
      url: "api/taggings",
      data: data,
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (taggable) {
        callback && callback(taggable);
      }
    });
  },
  fetchTopTags: function (callback) {
    request({
      method: "GET",
      url: "api/tags/top-tags",
      type: "json",
      success: function (tags) {
        TagActions.receiveTopTags(tags);
        callback && callback();
      }
    });
  },
  fetchTagDetails: function (data, callback) {
    request({
      method: "GET",
      url: "api/tags/" + data,
      type: "json",
      success: function (tag) {
        TagActions.receiveTag(tag);
        callback && callback(tag);
      }
    });
  }
};

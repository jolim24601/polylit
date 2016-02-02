var TagActions = require('../actions/tag_actions');

module.exports = {
  createTags: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "api/tags",
      data: data,
      dataType: "json",
      success: function (tags) {
        TagActions.receiveTags(tags);
        callback && callback();
      }
    });
  },
  destroyTagging: function (data, callback) {
    $.ajax({
      type: "DELETE",
      url: "api/taggings",
      data: data,
      dataType: "json",
      success: function (taggable) {
        callback && callback(taggable);
      }
    });
  },
  createTagging: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "api/taggings",
      data: data,
      dataType: "json",
      success: function (taggable) {
        callback && callback(taggable);
      }
    });
  },
  fetchTopTags: function () {

  }
};

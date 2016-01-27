var ApiActions = require('../actions/api_actions');

module.exports = {
  destroySession: function () {
    $.ajax({
      type: "DELETE",
      url: "session",
      success: function () {
      },
      error: function () {
      }
    });
  },
  fetchTopStories: function () {
    $.ajax({
      type: "GET",
      url: "stories"
    });
  },
  publishStory: function (data, callback) {
    $.post("api/stories", { story: data }, function(story) {
      ApiActions.receiveSingleStory(story);
      callback && callback();
    });
  }
};

var ApiActions = require('../actions/api_actions');

module.exports = {
  fetchTopStories: function () {
    $.get({
      type: "GET",
      url: "api/stories",
      success: function (stories) {
        ApiActions.receiveTopStories(stories);
      }
    });
  },
  publishStory: function (data, callback) {
    $.post("api/stories", { story: data }, function(story) {
      ApiActions.receiveSingleStory(story);
      callback && callback();
    });
  },
  fetchStory: function (id, callback) {
    $.ajax({
      type: "GET",
      url: "api/stories/" + id,
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback();
      }
    });
  },
  fetchAuthor: function (id, callback) {
    $.ajax({
      type: "GET",
      url: "api/authors/" + id,
      success: function (author) {
        ApiActions.receiveAuthor(author);
        callback && callback();
      }
    });
  }
};

// ### Actions
// * ApiActions.deleteStory
// * StoryActions.editStory
// * StoryActions.destroyStory
//
// ### ApiUtil
// * ApiUtil.editStory
// * ApiUtil.destroyStory
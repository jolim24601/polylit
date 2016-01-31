var ApiActions = require('../actions/api_actions'),
    AuthorActions = require('../actions/author_actions'),
    CurrentAuthorActions = require('../actions/current_author_actions');

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
    $.ajax({
      type: "POST",
      url: "api/stories",
      dataType: "json",
      data: { story: data },
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback();
      },
      error: function (message) {
      }
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
        AuthorActions.receiveAuthor(author);
        callback && callback();
      }
    });
  },
  editAuthor: function (id, formData, callback) {
    $.ajax({
      type: "PATCH",
      url: "api/authors/" + id,
      dataType: "json",
      processData: false,
      contentType: false,
      data: formData,
      success: function (author) {
        AuthorActions.receiveAuthor(author);
        callback && callback();
      }
    });
  },
  createAuthor: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "api/authors",
      dataType: "json",
      data: { author: data },
      success: function (author) {
        AuthorActions.receiveAuthor(author);
        CurrentAuthorActions.receiveCurrentAuthor(author);
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

var ApiActions = require('../actions/api_actions'),
    AuthorActions = require('../actions/author_actions'),
    CurrentAuthorActions = require('../actions/current_author_actions');

module.exports = {
  fetchLatestStories: function (data, callback) {
    $.get({
      type: "GET",
      url: "api/stories",
      data: data,
      success: function (stories) {
        ApiActions.receiveTopStories(stories);
        callback && callback();
      }
    });
  },
  saveStory: function (data, callback) {
    var url;
    if (data.storyId) {
      url = "api/stories/" + String(data.storyId);
    } else {
      url = "api/stories";
    }

    $.ajax({
      type: data.verb,
      url: url,
      dataType: "json",
      data: { story: data.story },
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback(story);
      },
      error: function (message) {
      }
    });
  },
  destroyStory: function (data) {
    $.ajax({
      type: "DELETE",
      url: "api/stories/" + data.id
    });
  },
  fetchStory: function (id, callback) {
    $.ajax({
      type: "GET",
      url: "api/stories/" + id,
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback(story);
      }
    });
  },
  fetchAuthor: function (id, callback) {
    $.ajax({
      type: "GET",
      url: "api/authors/" + id,
      success: function (author) {
        AuthorActions.receiveAuthor(author);
        callback && callback(author);
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

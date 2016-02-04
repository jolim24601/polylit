var ApiActions = require('../actions/api_actions'),
    TagActions = require('../actions/tag_actions'),
    AuthorActions = require('../actions/author_actions'),
    CurrentAuthorActions = require('../actions/current_author_actions');

module.exports = {
  fetchTopStories: function (callback) {
    $.get({
      type: "GET",
      url: "api/stories/top-stories",
      success: function (stories) {
        ApiActions.receiveTopStories(stories);
        callback && callback();
      }
    });
  },
  fetchStories: function (data, callback) {
    $.get({
      type: "GET",
      url: "api/stories",
      data: data,
      success: function (stories) {
        ApiActions.receiveLatestStories(stories);
        callback && callback();
      }
    });
  },
  fetchStoriesByTagName: function (data, callback) {
    $.ajax({
      type: "GET",
      url: "api/stories/tag/" + data.tagName,
      data: data,
      success: function (stories) {
        ApiActions.receiveStoriesByTag(stories);
        callback && callback(stories);
      }
    });
  },
  fetchBookmarkedStories: function (data, callback) {
    $.ajax({
      type: "GET",
      url: "api/bookmarks",
      data: data,
      success: function (stories) {
        ApiActions.receiveBookmarkedStories(stories);
        callback && callback(stories);
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
  destroyStory: function (data, callback) {
    $.ajax({
      type: "DELETE",
      url: "api/stories/" + data.id,
      success: function (story) {
        callback && callback(story);
      }
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
  toggleFavorite: function (data, callback) {
    $.ajax({
      type: data.type,
      url: "api/favorites",
      data: data,
      dataType: "json",
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback(story);
      }
    });
  },
  toggleBookmark: function (data, callback) {
    $.ajax({
      type: data.type,
      url: "api/bookmarks",
      data: data,
      dataType: "json",
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
  },
  destroyAuthor: function (data, callback) {
    $.ajax({
      type: "DELETE",
      url: "api/authors/" + data,
      success: function () {
        CurrentAuthorActions.destroyCurrentAuthor();
        callback && callback();
      }
    });
  }
};

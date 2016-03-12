var ApiActions = require('../actions/api_actions'),
    TagActions = require('../actions/tag_actions'),
    FlashActions = require('../actions/flash_actions'),
    AuthorActions = require('../actions/author_actions'),
    CurrentAuthorActions = require('../actions/current_author_actions'),
    reqwest = require('reqwest');


module.exports = {
  fetchTopStories: function (data, callback) {
    reqwest({
      method: "GET",
      url: "api/stories/top-stories",
      data: data,
      success: function (stories) {
        ApiActions.receiveTopStories(stories);
        AuthorActions.receiveAuthorsFromStories(stories);
        callback && callback();
      }
    });
  },
  fetchStories: function (data, callback) {
    reqwest({
      method: "GET",
      url: "api/stories",
      data: data,
      success: function (stories) {
        ApiActions.receiveLatestStories(stories);
        AuthorActions.receiveAuthorsFromStories(stories);
        callback && callback();
      }
    });
  },
  fetchStoriesByTagName: function (data, callback) {
    reqwest({
      method: "GET",
      url: "api/stories/tag/" + data.tagName,
      data: data,
      success: function (stories) {
        ApiActions.receiveStoriesByTag(stories);
        AuthorActions.receiveAuthorsFromStories(stories);
        callback && callback(stories);
      }
    });
  },
  fetchBookmarkedStories: function (callback) {
    reqwest({
      method: "GET",
      url: "api/bookmarks",
      success: function (stories) {
        ApiActions.receiveBookmarkedStories(stories);
        AuthorActions.receiveAuthorsFromStories(stories);
        callback && callback(stories);
      }
    });
  },
  fetchFollowedAuthorStories: function (callback) {
    reqwest({
      method: "GET",
      url: "api/stories/followed-stories",
      success: function (stories) {
        ApiActions.receiveFollowedStories(stories);
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

    reqwest({
      method: data.verb,
      url: url,
      type: "json",
      data: { story: data.story },
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback(story);
      },
      error: function (flash) {
        FlashActions.updateFlash(flash);
      }
    });
  },
  destroyStory: function (data, callback) {
    reqwest({
      method: "DELETE",
      url: "api/stories/" + data.id,
      success: function (story) {
        callback && callback(story);
      }
    });
  },
  fetchStory: function (id, callback) {
    reqwest({
      method: "GET",
      url: "api/stories/" + id,
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback(story);
      }
    });
  },
  toggleFavorite: function (data, callback) {
    reqwest({
      method: data.type,
      url: "api/favorites",
      data: data,
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (author) {
        CurrentAuthorActions.receiveCurrentAuthor(author);
        callback && callback();
      }
    });
  },
  toggleBookmark: function (data, callback) {
    reqwest({
      method: data.type,
      url: "api/bookmarks",
      data: data,
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (author) {
        CurrentAuthorActions.receiveCurrentAuthor(author);
        callback && callback();
      }
    });
  },
  fetchAuthor: function (id, callback) {
    reqwest({
      method: "GET",
      url: "api/authors/" + id,
      success: function (author) {
        AuthorActions.receiveAuthor(author);
        callback && callback(author);
      }
    });
  },
  editAuthor: function (id, formData, callback) {
    reqwest({
      method: "PATCH",
      url: "api/authors/" + id,
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      data: formData,
      success: function (author) {
        CurrentAuthorActions.receiveCurrentAuthor(author);
        AuthorActions.receiveAuthor(author);
        callback && callback();
      },
      error: function (flash) {
        FlashActions.updateFlash(flash);
      }
    });
  },
  createAuthor: function (data, callback) {
    reqwest({
      method: "POST",
      url: "api/authors",
      type: "json",
      data: { author: data },
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (author) {
        AuthorActions.receiveAuthor(author);
        CurrentAuthorActions.receiveCurrentAuthor(author);
        callback && callback();
      },
      error: function (flash) {
        FlashActions.updateFlash(flash);
      }
    });
  },
  destroyAuthor: function (data, callback) {
    reqwest({
      type: "DELETE",
      url: "api/authors/" + data,
      success: function () {
        CurrentAuthorActions.destroyCurrentAuthor();
        callback && callback();
      }
    });
  }
};

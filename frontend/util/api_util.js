var ApiActions = require('../actions/api_actions'),
    TagActions = require('../actions/tag_actions'),
    FlashActions = require('../actions/flash_actions'),
    AuthorActions = require('../actions/author_actions'),
    CurrentAuthorActions = require('../actions/current_author_actions'),
    request = require('reqwest'),
    qwest = require('qwest');


module.exports = {
  fetchTopStories: function (data, callback) {
    request({
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
    request({
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
    request({
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
    request({
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
    request({
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

    request({
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
    request({
      method: "DELETE",
      url: "api/stories/" + data.id,
      success: function (story) {
        callback && callback(story);
      }
    });
  },
  fetchStory: function (id, callback) {
    request({
      method: "GET",
      url: "api/stories/" + id,
      success: function (story) {
        ApiActions.receiveSingleStory(story);
        callback && callback(story);
      }
    });
  },
  toggleFavorite: function (data, callback) {
    request({
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
    request({
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
    request({
      method: "GET",
      url: "api/authors/" + id,
      success: function (author) {
        AuthorActions.receiveAuthor(author);
        callback && callback(author);
      }
    });
  },
  editAuthor: function (id, formData, callback) {
    // reqwest does not handle xhr2 types, will have to migrate to qwest
    qwest
      .map("PATCH", "api/authors/" + id, formData,
      {
        dataType: 'formdata',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      })
     .then(function(xhr, response) {
       var author = response;
       CurrentAuthorActions.receiveCurrentAuthor(author);
       AuthorActions.receiveAuthor(author);
       callback && callback();
      })
      .catch(function(e, xhr, response) {
        FlashActions.updateFlash(e);
      });
  },
  createAuthor: function (data, callback) {
    request({
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
    request({
      type: "DELETE",
      url: "api/authors/" + data,
      success: function () {
        CurrentAuthorActions.destroyCurrentAuthor();
        callback && callback();
      }
    });
  }
};

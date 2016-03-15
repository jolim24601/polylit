var ApiActions = require('../actions/api_actions'),
    TagActions = require('../actions/tag_actions'),
    FlashActions = require('../actions/flash_actions'),
    AuthorActions = require('../actions/author_actions'),
    CurrentAuthorActions = require('../actions/current_author_actions'),
    qwest = require('qwest');

qwest.setDefaultOptions({
    dataType: 'post',
    responseType: 'json',
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')
                              .content
    }
});

module.exports = {
  fetchTopStories: function (data, callback) {
    qwest.get("api/stories/top-stories", data)
         .then(function (xhr, response) {
           ApiActions.receiveTopStories(response);
           AuthorActions.receiveAuthorsFromStories(response);
           callback && callback();
         });
  },
  fetchStories: function (data, callback) {
    qwest.get("api/stories", data)
         .then(function (xhr, response) {
           ApiActions.receiveLatestStories(response);
           AuthorActions.receiveAuthorsFromStories(response);
           callback && callback();
         });
  },
  fetchStoriesByTagName: function (data, callback) {
    qwest.get("api/stories/tag/" + data.tagName, data)
         .then(function (xhr, response) {
           ApiActions.receiveStoriesByTag(response);
           AuthorActions.receiveAuthorsFromStories(response);
           callback && callback(response);
         });
  },
  fetchBookmarkedStories: function (callback) {
    qwest.get("api/bookmarks")
         .then(function (xhr, response) {
           ApiActions.receiveBookmarkedStories(response);
           AuthorActions.receiveAuthorsFromStories(response);
           callback && callback(response);
         });
  },
  fetchFollowedAuthorStories: function (callback) {
    qwest.get("api/stories/followed-stories")
         .then(function (xhr, response) {
           ApiActions.receiveFollowedStories(response);
           callback && callback(response);
         });
  },
  saveStory: function (data, callback) {
    var url;
    if (data.storyId) {
      url = "api/stories/" + String(data.storyId);
    } else {
      url = "api/stories";
    }

    qwest.map(data.verb, url, { story: data.story })
         .then(function (xhr, response) {
           ApiActions.receiveSingleStory(response);
           callback && callback(response);
         })
         .catch(function(e, xhr, response) {
           FlashActions.updateFlash(e);
         });
  },
  destroyStory: function (data, callback) {
    qwest.map("DELETE", "api/stories" + data.id)
         .then(function (xhr, response) {
           callback && callback(response);

         });
  },
  fetchStory: function (id, callback) {
    qwest.get("api/stories/" + id)
         .then(function (xhr, response) {
           ApiActions.receiveSingleStory(response);
           callback && callback(response);
         });
  },
  toggleFavorite: function (data, callback) {
    qwest.map(data.type, "api/favorites", data)
         .then(function (xhr, response) {
           CurrentAuthorActions.receiveCurrentAuthor(response);
           callback && callback();
         });
  },
  toggleBookmark: function (data, callback) {
    qwest.map(data.type, "api/bookmarks", data)
         .then(function (xhr, response) {
           CurrentAuthorActions.receiveCurrentAuthor(response);
           callback && callback();
         });
  },
  fetchAuthor: function (id, callback) {
    qwest.get("api/authors/" + id)
         .then(function (xhr, response) {
           AuthorActions.receiveAuthor(response);
           callback && callback(response);
         });
  },
  editAuthor: function (id, formData, callback) {
    qwest.map("PATCH", "api/authors/" + id, formData, { dataType: 'formdata' })
         .then(function (xhr, response) {
           CurrentAuthorActions.receiveCurrentAuthor(response);
           AuthorActions.receiveAuthor(response);
           callback && callback();
         })
         .catch(function(e, xhr, response) {
           FlashActions.updateFlash(e);
         });
  },
  createAuthor: function (data, callback) {
    qwest.post("api/authors", { author: data })
         .then(function (xhr, response) {
           AuthorActions.receiveAuthor(response);
           CurrentAuthorActions.receiveCurrentAuthor(response);
           callback && callback();
         })
         .catch(function (e, xhr, response) {
           FlashActions.updateFlash(e);
         });
  },
  destroyAuthor: function (data, callback) {
    qwest.map("DELETE", "api/authors/" + data)
         .then(function (xhr, response) {
           CurrentAuthorActions.destroyCurrentAuthor();
           callback && callback();
         });
  }
};

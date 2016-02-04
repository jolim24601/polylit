var CurrentAuthorActions = require('../actions/current_author_actions');

module.exports = {
  toggleFollow: function (data, callback) {
    $.ajax({
      type: data.type,
      url: "api/follows",
      data: data,
      dataType: "json",
      success: function (follow) {
        CurrentAuthorActions.updateFollow(follow);
        callback && callback(follow);
      }
    });
  }
};

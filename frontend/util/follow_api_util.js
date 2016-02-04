var FollowActions = require('../actions/follow_actions'),
    CurrentAuthorActions = require('../actions/current_author_actions');

module.exports = {
  toggleFollow: function (data, callback) {
    $.ajax({
      type: data.type,
      url: "api/follows",
      data: data,
      dataType: "json",
      success: function (follower, followed) {
        // update the current author here, whatever was followed on the component
        CurrentAuthorActions.receiveCurrentAuthor(follower);
        callback && callback(followed);
      }
    });
  }
};

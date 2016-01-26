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
  }
};

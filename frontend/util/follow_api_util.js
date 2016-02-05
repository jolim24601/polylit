module.exports = {
  toggleFollow: function (data, callback) {
    $.ajax({
      type: data.type,
      url: "api/follows",
      data: data,
      dataType: "json",
      success: function (follow) {
        callback && callback(follow);
      }
    });
  }
};

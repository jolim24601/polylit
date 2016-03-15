var request = require('reqwest');

module.exports = {
  toggleFollow: function (data, callback) {
    request({
      method: data.type,
      url: "api/follows",
      data: data,
      type: "json",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      success: function (follow) {
        callback && callback(follow);
      }
    });
  }
};

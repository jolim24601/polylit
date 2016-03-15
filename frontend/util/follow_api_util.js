var qwest = require('qwest');

module.exports = {
  toggleFollow: function (data, callback) {
    qwest.map(data.verb, "api/follows", data)
         .then(function (xhr, response) {
           callback && callback(response);
         });
  }
};

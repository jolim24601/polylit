var _ = require('underscore');

module.exports = {
  infiniteScroller: function (handler) {
    var throttled = _.throttle(handler, 1500);

    $(window).scroll(throttled);
    return throttled;
  }
};

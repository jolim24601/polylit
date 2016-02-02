var _ = require('underscore');

module.exports = {
  infiniteScroller: function (callback) {
    var throttled = _.throttle(function scrollHandler() {
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
          callback();
        }
      }, 1500);

    this.scrollerId = $(window).scroll(throttled);
  }
};

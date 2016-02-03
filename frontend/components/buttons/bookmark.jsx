var React = require('react');
var FontAwesome = require('react-fontawesome');

var Bookmark = React.createClass({
  bookmarkStory: function () {

  },
  render: function () {
    return (
      <FontAwesome
        onClick={this.bookmarkStory}
        name="fa fa-bookmark-o"
        className="bookmark-button floatRight"
        />

    );
  }
});

module.exports = Bookmark;

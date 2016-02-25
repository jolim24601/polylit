var React = require('react'),
    Bookmark = require('../buttons/bookmark'),
    Favorite = require('../buttons/favorite');

// appears in two formats: in the story feed with
// author card up top, and in the story view with
// the author card inline + share + follow
// the response button takes you directly to the bottom of the article
// favorites and bookmarks get color-filled

var Footer = React.createClass({
  render: function () {
    var story = this.props.story;

    return (
      <div className="story-preview-footer group">
        <Bookmark story={story} />
        <div className="fav-count">{story.favoritesCount}</div>
        <Favorite story={story} />
      </div>
    );
  }
});

module.exports = Footer;

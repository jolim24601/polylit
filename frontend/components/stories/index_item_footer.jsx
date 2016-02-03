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
      <footer className="story-preview-footer group">
        <small>
          <Bookmark storyId={story.id} />
          <div className="fav-count">{story.favorites}</div>
          <Favorite storyId={story.id} />

        </small>
      </footer>
    );
  }
});

module.exports = Footer;

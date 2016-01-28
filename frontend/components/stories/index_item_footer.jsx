var React = require('react');

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
          <button className="favorite-button floatLeft">
            Hearts {story.favorites}
          </button>
          <button className="bookmark-button floatRight">
            Boomark
          </button>
          <button className="response-button floatRight">
            Responses {story.responses}
          </button>
        </small>
      </footer>
    );
  }
});

module.exports = Footer;

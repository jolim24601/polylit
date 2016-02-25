var React = require('react'),
    FontAwesome = require('react-fontawesome'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    History = require('react-router').History;

var Bookmark = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var story = StoryStore.find(this.props.story.id) || this.props.story;

    var bookmarks = CurrentAuthorStore.currentAuthor().bookmarks;
    var storyIds = bookmarks.map(function (bookmark) {
      return bookmark.story_id;
    });

    if (storyIds.indexOf(story.id) !== -1) {
      return { bookmarked: true };
    }
    return { bookmarked: false };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.listener = CurrentAuthorStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  bookmarkStory: function () {
    if (!CurrentAuthorStore.isLoggedIn()) {
      this.history.pushState(null, 'auth', {});
    }

    var type = this.state.bookmarked ? "DELETE" : "POST";

    ApiUtil.toggleBookmark({
      bookmark: {
        story_id: this.props.story.id,
        author_id: CurrentAuthorStore.currentAuthor().id
      },
      type: type
    });
  },
  render: function () {
    var name = this.state.bookmarked ? "fa fa-bookmark" : "fa fa-bookmark-o";

    return (
      <small>
        <FontAwesome
          onClick={this.bookmarkStory}
          name={name}
          className="bookmark-button floatRight"
          />
      </small>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = Bookmark;

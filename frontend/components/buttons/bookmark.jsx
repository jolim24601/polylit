var React = require('react');
var FontAwesome = require('react-fontawesome');

var ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var History = require('react-router').History;

var Bookmark = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var bookmarks = StoryStore.find(this.props.storyId).bookmarks;
    var authorIds = bookmarks.map(function (bk) {
      return bk.author_id;
    });
    if (authorIds.indexOf(CurrentAuthorStore.currentAuthor().id) !== -1) {
      return { bookmarked: true};
    }
    return { bookmarked: false };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.listener = StoryStore.addListener(this._onChange);
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
        story_id: this.props.storyId,
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

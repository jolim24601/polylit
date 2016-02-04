var React = require('react'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    StoryIndexItem = require('./story_index_item'),
    StoryStore = require('../../stores/story_store'),
    History = require('react-router').History,
    ApiUtil = require('../../util/api_util');

var infiniteScroller = require('../../util/helpers').infiniteScroller;

var Navbar = require('../navbar/navbar'),
    Sidebar = require('../sidebar/sidebar'),
    NavTools = require('../navbar/nav_tools');

var BookmarksIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { stories: [], page: 1 };
  },
  componentWillReceiveProps: function () {
    var data = { page: this.state.page };
    this.fetchBookmarkedStories(data);
  },
  nextPage: function () {
    var nextPage = this.state.page + 1;
    var data = { page: nextPage };
    this.setState({ page: nextPage });
    this.fetchBookmarkedStories(data);
  },
  componentDidMount: function () {
    if (!CurrentAuthorStore.isLoggedIn()) {
      this.history.pushState(null, 'auth', {});
    }
    this.listener = StoryStore.addListener(this._onChange);

    var data = { page: 1 };
    this.fetchBookmarkedStories(data);

    this.throttled = infiniteScroller(this.nextPage);
  },
  fetchBookmarkedStories: function (data) {
    this.serverRequest = ApiUtil.fetchBookmarkedStories(data, function (stories) {
      this.setState({ stories: stories });
    }.bind(this));
  },
  componentWillUnmount: function () {
    $(window).off('scroll', this.throttled);
    if (this.serverRequest) { this.serverRequest.abort(); }
    this.listener.remove();
  },
  render: function () {
    var storyList = this.state.stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    return (
      <div className="main-content">
        <Navbar><NavTools /></Navbar>
        <Sidebar />
        <ul className="bookmarked story-feed">
          <li className="heading-title">Your bookmarks</li>
          {storyList}
        </ul>
      </div>
    );
  },
  _onChange: function () {
    this.setState({ stories: StoryStore.all() });
  }
});

module.exports = BookmarksIndex;

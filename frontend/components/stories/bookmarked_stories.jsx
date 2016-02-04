var React = require('react'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    StoryIndexItem = require('./story_index_item'),
    StoryStore = require('../../stores/story_store'),
    History = require('react-router').History,
    ApiUtil = require('../../util/api_util');

var Navbar = require('../navbar/navbar'),
    HomeTools = require('../navbar/home_tools'),
    Sidebar = require('../sidebar/sidebar'),
    NavTools = require('../navbar/nav_tools');

var BookmarksIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { stories: [], page: 1 };
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

    var self = this;
    var data = { page: 1 };
    ApiUtil.fetchBookmarkedStories(data, function (stories) {
      self.setState({ stories: stories }, function () {
        self.listener = StoryStore.addListener(this._onChange);
      });
    });

    // this.throttled = infiniteScroller(this.nextPage);
  },
  fetchBookmarkedStories: function (data) {
    ApiUtil.fetchBookmarkedStories(data, function (stories) {
      this.setState({ stories: stories });
    }.bind(this));
  },
  componentWillUnmount: function () {
    $(window).off('scroll', this.throttled);
    this.listener.remove();
  },
  render: function () {
    var storyList = this.state.stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    return (
      <div className="main-content">
        <Navbar><HomeTools location={this.props.location} /><NavTools /></Navbar>
        <Sidebar />
        <ul className="bookmarked story-feed">
          <li className="heading-title">Your most recent bookmarks</li>
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

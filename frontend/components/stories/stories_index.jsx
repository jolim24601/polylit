var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util');

var Navbar = require('../navbar/navbar'),
    HomeTools = require('../navbar/home_tools'),
    NavTools = require('../navbar/nav_tools');

var infiniteScroller = require('../../util/helpers').infiniteScroller;

var StoriesIndex = React.createClass({
  getInitialState: function () {
    return ({ stories: StoryStore.all(), page: 1 });
  },
  componentDidMount: function () {
    this.storyStoreListener = StoryStore.addListener(this._onChange);

    ApiUtil.fetchLatestStories({ page: this.state.page },
      infiniteScroller(this.nextPage));
  },
  nextPage: function () {
    var nextPage = this.state.page + 1;
    ApiUtil.fetchLatestStories({ page: nextPage });
    this.setState({ page: nextPage });
  },
  addInfiniteScroller: function () {
    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        this.nextPage();
      }
    }.bind(this));
  },
  componentWillUnmount: function () {
    this.storyStoreListener.remove();
  },
  render: function () {
    var stories = this.state.stories;

    var storyList = stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    return (
      <div className="main-content">
        <Navbar><HomeTools /><NavTools /></Navbar>
        <ul className="story-feed">
          <li className="heading-title">Latest stories</li>
          {storyList}
        </ul>
      </div>
    );
  },
  _onChange: function () {
    this.setState({ stories: StoryStore.all() });
  }
});

module.exports = StoriesIndex;

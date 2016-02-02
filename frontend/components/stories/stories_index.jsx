var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    Sidebar = require('../sidebar/sidebar'),
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

    // Feed options and have the controller make queries,
    // eventually pass the API request in as a prop
    ApiUtil.fetchStories({ page: this.state.page},
    infiniteScroller(this.nextPage));
  },
  nextPage: function () {
    var nextPage = this.state.page + 1;
    ApiUtil.fetchStories({ page: nextPage });
    this.setState({ page: nextPage });
  },
  componentWillUnmount: function () {
    this.storyStoreListener.remove();
    $(window).off('scroll', this.scrollerId);
  },
  render: function () {
    var stories = this.state.stories;

    var storyList = stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    var heading = this.props.location === '/' ? "Latest Stories" : "Top Stories";

    return (
      <div className="main-content">
        <Navbar><HomeTools location={this.props.location} /><NavTools /></Navbar>
        <ul className="story-feed">
          <li className="heading-title">{heading}</li>
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

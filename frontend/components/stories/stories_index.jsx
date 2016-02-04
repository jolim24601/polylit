var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util'),
    infiniteScroller = require('../../util/helpers').infiniteScroller;

var Navbar = require('../navbar/navbar'),
    Sidebar = require('../sidebar/sidebar'),
    HomeTools = require('../navbar/home_tools'),
    NavTools = require('../navbar/nav_tools');


var StoriesIndex = React.createClass({
  getInitialState: function () {
    return ({ stories: StoryStore.all(), page: 1 });
  },
  componentDidMount: function () {
    this.listener = StoryStore.addListener(this._onChange);

    // Feed options and have the controller make queries,
    // eventually pass the API request in as a prop
    ApiUtil.fetchStories({ page: this.state.page});
    // this.throttled = infiniteScroller(this.nextPage);
  },
  nextPage: function () {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
      var nextPage = this.state.page + 1;
      this.setState({ page: nextPage });
      ApiUtil.fetchStories({ page: nextPage });
    }
  },
  componentWillUnmount: function () {
    this.listener.remove();
    // $(window).off('scroll', this.throttled);
    // $(window).off('scroll', this.nextPage);
  },
  render: function () {
    var stories = this.state.stories;

    var storyList = stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    var heading = this.props.location.pathname === '/' ? "Latest Stories" : "Top Stories";

    return (
      <div className="main-content">
        <Navbar><HomeTools location={this.props.location} /><NavTools /></Navbar>
        <Sidebar />
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

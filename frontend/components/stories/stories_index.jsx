var React = require('react'),
    CustomFeed = require('./custom_feed'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util'),
    objectAssign = require('object-assign');

var Navbar = require('../navbar/navbar'),
    Sidebar = require('../sidebar/sidebar'),
    HomeTools = require('../navbar/home_tools'),
    NavTools = require('../navbar/nav_tools');

var StoriesIndex = React.createClass({
  getStateFromStore: function () {
    if (this.props.location.pathname === '/') {
      return ({ stories: StoryStore.all() });
    }
    return ({ stories: StoryStore.topStories() });
  },
  getInitialState: function () {
    return objectAssign(
      this.getStateFromStore(), { 
        page: 0, 
        loading: false,
        noMoreStories: false 
      }
    );
  },
  componentDidMount: function () {
    this.lastTime = Date.now();
    this.listener = StoryStore.addListener(this._onChange);

    this.fetchStories();
    document.addEventListener('scroll', this.nextPage);
  },
  nextPage: function () {
    // Throttle the AJAX call to prevent thrashing the server
    if ($(window).scrollTop() + $(window).height() === $(document).height()
        && (Date.now() - this.lastTime) > 2500) {

      this.fetchStories();
      this.lastTime = Date.now();
    }
  },
  fetchStories: function () {
    var pageParams = { page: this.state.page + 1 };
    this.setState(objectAssign({}, pageParams, { loading: true }));
    ApiUtil.fetchStories(pageParams, this.stopLoading);
    ApiUtil.fetchTopStories(pageParams, this.stopLoading);
  },
  stopLoading: function () {
    this.setState({ loading: false });
  },
  componentWillUnmount: function () {
    this.listener.remove();
    document.removeEventListener('scroll', this.nextPage);
  },
  render: function () {
    var loadingAnimation;
    if (this.state.loading && !this.state.noMoreStories) {
      loadingAnimation = <div className="ellipsis" />;
    }

    var stories = this.state.stories;

    var storyList = stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    var heading = this.props.location.pathname === '/' ? "Latest Stories" : "Top Stories";

    return (
      <div className="main-content">
        <Navbar><HomeTools location={this.props.location} /><NavTools /></Navbar>
        <Sidebar />
        <CustomFeed location={this.props.location} />
        <ul className="story-feed">
          <li className="heading-title">{heading}</li>
          {storyList}
          {loadingAnimation}
        </ul>
      </div>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore(), function () {
      if (this.state.stories.length < 25) {
        this.setState({ noMoreStories: true });
      }
    }.bind(this));
  }
});

module.exports = StoriesIndex;

var React = require('react'),
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
    return objectAssign(this.getStateFromStore(), { page: 1 });
  },
  componentDidMount: function () {
    this.lastTime = Date.now();
    this.listener = StoryStore.addListener(this._onChange);

    ApiUtil.fetchStories({ page: this.state.page});
    document.addEventListener('scroll', this.nextPage);
  },
  nextPage: function () {
    // Throttle the AJAX call to prevent thrashing the server
    if ($(window).scrollTop() + $(window).height() === $(document).height()
        && (Date.now() - this.lastTime) > 2500) {
      var nextPage = this.state.page + 1;
      this.setState({ page: nextPage });
      ApiUtil.fetchStories({ page: nextPage });
      this.lastTime = Date.now();
    }
  },
  componentWillUnmount: function () {
    this.listener.remove();
    document.removeEventListener('scroll', this.nextPage);
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
    this.setState(this.getStateFromStore());
  }
});

module.exports = StoriesIndex;

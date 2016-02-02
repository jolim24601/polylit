var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util');

var infiniteScroller = require('../../util/helpers').infiniteScroller;

var Navbar = require('../navbar/navbar'),
    Sidebar = require('../sidebar/sidebar'),
    NavTools = require('../navbar/nav_tools');

var TaggedStoriesIndex = React.createClass({
  getInitialState: function () {
    return { page: 1 };
  },
  nextPage: function () {
    var nextPage = this.state.page + 1;
    ApiUtil.fetchStoriesByTag({
      tag: this.props.params.name,
      page: nextPage
    });

    this.setState({ page: nextPage });
  },
  componentDidMount: function () {
    this.listener = StoryStore.addListener(this._onChange);
    ApiUtil.fetchStoriesByTag({
      page: 1,
      tag: this.props.params.name
    });
    
    infiniteScroller(this.nextPage);
  },
  componentWillUnmount: function () {
    this.listener.remove();
    $(window).off('scroll', this.scrollerId);
  },
  render: function () {
    var storiesList = StoryStore.all().map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    return (
      <div className="main-content">
        <Navbar><NavTools /></Navbar>
        <div className="heading">
          <span>TAGGED IN</span>
          <h3>{this.props.params.name}</h3>
        </div>
        <Sidebar />
        <ul className="story-feed">
          {storiesList}
        </ul>
      </div>
    );
  },
  _onChange: function () {
    this.forceUpdate();
  }
});

module.exports = TaggedStoriesIndex;

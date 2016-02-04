var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util'),
    infiniteScroller = require('../../util/helpers').infiniteScroller;

var Navbar = require('../navbar/navbar'),
    Sidebar = require('../sidebar/sidebar'),
    NavTools = require('../navbar/nav_tools');

var TaggedStoriesIndex = React.createClass({
  getInitialState: function () {
    return { page: 1, stories: [] };
  },
  componentWillReceiveProps: function (newProps) {
    var data = { page: 1, tag: newProps.params.name };
    this.setState({ page: 1 },
      ApiUtil.fetchStoriesByTag(data, function (stories) {
        this.setState({ stories: stories });
      }.bind(this))
    );
  },
  nextPage: function () {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
      var nextPage = this.state.page + 1;
      this.setState({ page: nextPage });

      ApiUtil.fetchStoriesByTag({
        tag: this.props.params.name,
        page: nextPage
      });
    }
  },
  componentDidMount: function () {
    var data = { page: 1, tag: this.props.params.name };
    ApiUtil.fetchStoriesByTag(data, function (stories) {
      this.listener = StoryStore.addListener(this._onChange);
      this.setState({ stories: stories });
    }.bind(this));

    // this.throttled = infiniteScroller(this.nextPage);
  },
  componentWillUnmount: function () {
    this.listener.remove();
    $(window).off('scroll', this.throttled);
  },
  render: function () {
    var storyList = this.state.stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    return (
      <div className="main-content">
        <Navbar><NavTools /></Navbar>
        <Sidebar />
        <ul className="tagged story-feed">
          <li>
            <span>TAGGED IN</span>
            <h3>{this.props.params.name}</h3>
          </li>
          {storyList}
        </ul>
      </div>
    );
  },
  _onChange: function () {
    this.setState({ stories: StoryStore.all() });
  }
});

module.exports = TaggedStoriesIndex;

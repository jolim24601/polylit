var React = require('react'),
    TagStore = require('../../stores/tag_store'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    Follow = require('../buttons/follow'),
    TagApiUtil = require('../../util/tag_api_util'),
    ApiUtil = require('../../util/api_util');

var Navbar = require('../navbar/navbar'),
    Sidebar = require('../sidebar/sidebar'),
    NavTools = require('../navbar/nav_tools');

var TaggedStoriesIndex = React.createClass({
  getInitialState: function () {
    return { page: 1, stories: [], tag: null, tagName: this.props.params.name };
  },
  fetchTagDetails: function (tagName) {
    TagApiUtil.fetchTagDetails(tagName, function (tag) {
      this.setState({ tag: tag });
    }.bind(this));
  },
  componentWillReceiveProps: function (newProps) {
    var data = { page: 1, tagName: newProps.params.name };
    this.setState({ page: 1, tagName: newProps.params.name });

    ApiUtil.fetchStoriesByTagName(data, function (stories) {
      this.setState({ stories: stories });
    }.bind(this));

    this.fetchTagDetails(newProps.params.name);
  },
  nextPage: function () {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
      var nextPage = this.state.page + 1;
      this.setState({ page: nextPage });

      ApiUtil.fetchStoriesByTagName({
        tagName: this.props.params.name,
        page: nextPage
      });
    }
  },
  componentDidMount: function () {
    var data = { page: 1, tagName: this.props.params.name };
    ApiUtil.fetchStoriesByTagName(data, function (stories) {
      this.storyListener = StoryStore.addListener(this._onChange);
      this.setState({ stories: stories });
    }.bind(this));

    this.tagListener = TagStore.addListener(this._onChange);
    this.fetchTagDetails(this.props.params.name);
    // this.throttled = infiniteScroller(this.nextPage);
  },
  componentWillUnmount: function () {
    this.storyListener.remove();
    this.tagListener.remove();
    // $(window).off('scroll', this.throttled);
  },
  render: function () {
    var storyList = this.state.stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    if (!this.state.tag) {
      return (
        <div className="spinner">
          <small className="loading">Loading...</small>
        </div>
      );
    }

    return (
      <div className="main-content">
        <Navbar><NavTools /></Navbar>
        <Sidebar />
        <ul className="tagged story-feed">
          <Follow followable={this.state.tag} />
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

    this.setState({
      stories: StoryStore.all(),
      tagName: this.props.params.name,
      tag: TagStore.find(this.props.params.name)
   });
  }
});

module.exports = TaggedStoriesIndex;

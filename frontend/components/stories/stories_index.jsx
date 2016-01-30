var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util');

var Navbar = require('../navbar/navbar'),
    HomeTools = require('../navbar/home_tools'),
    NavTools = require('../navbar/nav_tools');

var StoriesIndex = React.createClass({
  getInitialState: function () {
    return ({ stories: StoryStore.all() });
  },
  componentDidMount: function () {
    this.storyStoreListener = StoryStore.addListener(this._onChange);
    ApiUtil.fetchTopStories();
  },
  componentWillUnmount: function () {
    this.storyStoreListener.remove();
  },
  render: function () {
    var stories = this.state.stories;
    var storyList = Object.keys(stories).map(function (key) {
      return <StoryIndexItem key={key} story={stories[key]} />;
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

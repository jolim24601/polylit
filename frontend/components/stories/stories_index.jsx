var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util');

var StoriesIndex = React.createClass({
  getInitialState: function () {
    return ({ stories: StoryStore.all() });
  },
  componentDidMount: function () {
    StoryStore.addListener(this._onChange);
    ApiUtil.fetchTopStories();
  },
  componentWillUnmount: function () {
    StoryStore.removeListener(this._onChange);
  },
  render: function () {
    var stories = this.state.stories;
    var storyList = Object.keys(stories).forEach(function (key) {
      return <StoryIndexItem key={key} story={stories[key]} />;
    });

    return (
      <ul className="story-feed">
        {storyList}
      </ul>
    );
  },
  _onChange: function () {
    this.setState({ stories: StoryStore.all() });
  }
});

module.exports = StoriesIndex;

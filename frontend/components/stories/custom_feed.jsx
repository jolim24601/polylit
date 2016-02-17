var React = require('react'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item'),
    ApiUtil = require('../../util/api_util');

var CustomFeed = React.createClass({
  getInitialState: function () {
    return { show: true, stories: [] };
  },
  componentDidMount: function () {
    this.listener = StoryStore.addListener(this._onChange);
    ApiUtil.fetchFollowedAuthorStories();
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  closeFeed: function () {
    this.setState({ show: false });
  },
  render: function () {
    var topStoryIds = StoryStore.topStories().map(function (story) { return story.id; });

    var followedStories = this.state.stories.filter(function (story) {
      // skips over repeats
      if (topStoryIds.indexOf(story.id) === -1) { return true; }
    })
    .map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

    if (!this.state.show
        || !CurrentAuthorStore.currentAuthor().id
        || followedStories.length < 1) {
      return <div></div>;
    }

    return (
      <ul className="custom story-feed">
        <li className="heading-title">
          Recent stories from authors you follow
          <button className="close-feed floatRight" onClick={this.closeFeed}>&times;</button>
        </li>

        {followedStories}
      </ul>
    );
  },
  _onChange: function () {
    this.setState({ stories: StoryStore.followedStories() });
  }
});

module.exports = CustomFeed;

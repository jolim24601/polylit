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
    if (!this.state.show || !CurrentAuthorStore.currentAuthor().id) {
      return <div></div>;
    }

    var followedStories = this.state.stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });

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

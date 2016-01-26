var React = require('react'),
    StoryStore = require('../../stores/story_store'),
    StoryIndexItem = require('./story_index_item');

var StoriesIndex = React.createClass({
  render: function () {
    var stories = StoryStore.all();
    var storyList = stories.map(function (story) {
      return <StoryIndexItem story={story} />;
    });

    return (
      <ul className="story-feed">
        {storyList}
      </ul>
    );
  }
});

module.exports = StoriesIndex;

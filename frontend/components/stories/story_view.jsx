var React = require('react'),
    ProseMirror = require('prosemirror/dist/edit'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store');

var StoryView = React.createClass({
  getStateFromStore: function () {
    return { story: StoryStore.find(this.props.params.id) };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.storyStoreListener = StoryStore.addListener(this._onChange);
    ApiUtil.fetchStory(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.storyStoreListener.remove();
  },
  render: function () {
    var story = this.state.story;
    debugger
    return (
      <article className="story-view">
      </article>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = StoryView;

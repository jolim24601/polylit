var React = require('react'),
    Tag = require('../tags/tag'),
    TagApiUtil = require('../../util/tag_api_util'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store');

var PublishButton = React.createClass({
  getStoryFromStore: function () {
    return StoryStore.find(this.props.storyId);
  },
  componentDidMount: function () {
    this.listener = StoryStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  getInitialState: function () {
    return ({
      story: this.getStoryFromStore(),
      value: '',
      helperActive: "hide",
      menuActive: "tag-menu hide"
    });
  },
  toggleView: function (e) {
    if (this.state.menuActive === "tag-menu hide") {
      this.setState({ menuActive: "tag-menu" });
    } else if ($(e.target).parents('.prepublish').length === 0) {
      this.setState({ menuActive: "tag-menu hide" });
    }
  },
  handleChange: function (e) {
    if (this.state.story.tags.length < 3) {
      this.setState({ value: e.target.value });
      debugger
      if (e.keyCode === 13) {
        var newTags = this.state.story.tags.concat(e.target.value);
        this.setState({ value: '', tags: newTags });
        TagApiUtil.createTaggings({
          tags: newTags,
          taggable_id: this.state.story.id,
          taggable_type: "Story"
        });
      }
    } else {
      this.setState({ helperActive: "tag-helper is-active" });
      setTimeout(function () {
        this.setState({ helperActive: "tag-helper hide" });
      }.bind(this), 3000);
    }
  },
  render: function () {
    var tags = this.state.story.tags.map(function (tag) {
      return <Tag tag={tag} />;
    });
    return (
      <div onClick={this.toggleView} className="prepublish primary button">
        Publish &or;
        <div className={this.state.menuActive}>
          <h3>Ready to publish?</h3>
          <p>Add or change tags (up to 3):</p>
          <div className="tag-box">{tags}</div>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Add a tag..."
            value={this.state.value} />
          <div className={this.state.helperActive}>You can only add up to 3 tags</div>

          <button
            id="full-publish"
            onClick={this.props.saveStory}
            className="publish primary"
            >
          Publish</button>
        </div>
      </div>
    );
  },
  _onChange: function () {
    this.setState({ story: this.getStoryFromStore() });
  }
});

module.exports = PublishButton;

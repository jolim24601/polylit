var React = require('react'),
    Tag = require('../tags/tag'),
    TagApiUtil = require('../../util/tag_api_util'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    ApiActions = require('../../actions/api_actions');

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
      menuActive: false
    });
  },
  toggleView: function (e) {
    if (!this.state.menuActive) {
      this.setState({ menuActive: true });
    } else if ($(e.target).parents('.prepublish').length === 0) {
      this.setState({ menuActive: false });
    }
  },
  handleSubmit: function (e) {
    this.setState({ value: e.target.value });

    if (e.key === "Enter") {
      TagApiUtil.createTagging({
        tag: e.target.value,
        taggable_id: this.state.story.id,
        taggable_type: "Story"
      }, ApiActions.receiveSingleStory);

      this.setState({ value: '' });
    }
  },
  deleteTag: function (e) {
    TagApiUtil.destroyTagging({
      tag: e.target.previousSibling.innerText,
      taggable_id: this.state.story.id,
      taggable_type: "Story"
    }, ApiActions.receiveSingleStory);

    this.forceUpdate();
  },
  handleChange: function (e) {
    if (this.state.story.tags.length < 3) {
      this.setState({ value: e.target.value });
    } else {
      this.setState({ helperActive: "tag-helper is-active" });
      setTimeout(function () {
        this.setState({ helperActive: "tag-helper hide" });
      }.bind(this), 3000);
    }
  },
  render: function () {
    var tags = this.state.story.tags.map(function (tag) {
      return <Tag deleteTag={this.deleteTag} key={tag.id} tag={tag} />;
    }, this);
    
    var tagMenu;
    if (this.state.menuActive) {
      tagMenu = (
        <div className="tag-menu">
          <h3>Ready to publish?</h3>
          <p>Add or change tags (up to 3):</p>
          <form className="tag-box group">
            {tags}
            <input
              type="text"
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}
              placeholder="Add a tag..."
              value={this.state.value} />
            <div className={this.state.helperActive}>You can only add up to 3 tags</div>
          </form>

          <button
            id="full-publish"
            onClick={this.props.saveStory}
            className="primary"
            >
            Publish</button>
        </div>
      );
    }

    return (
      <div onClick={this.toggleView} className="prepublish primary button">
        <span>Publish &or;</span>
        {tagMenu}
      </div>
    );
  },
  _onChange: function () {
    this.setState({ story: this.getStoryFromStore() });
  }
});

module.exports = PublishButton;

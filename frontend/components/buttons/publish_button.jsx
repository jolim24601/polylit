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
    document.removeEventListener('click', this.toggleView);
  },
  getInitialState: function () {
    return ({
      story: this.getStoryFromStore(),
      value: '',
      helperActive: "hide",
      menuActive: false,
      disabled: false
    });
  },
  toggleView: function (e) {
    if ($(e.target).parents('#pub-parent').length > 0) {
      return;
    }

    this.setState({ menuActive: !this.state.menuActive });
  },
  componentDidUpdate: function () {
    if (this.state.menuActive) {
      document.addEventListener('click', this.toggleView);
    } else {
      document.removeEventListener('click', this.toggleView);
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
      this.setState({ helperActive: "helper is-active" });
      setTimeout(function () {
        this.setState({ helperActive: "helper hide" });
      }.bind(this), 3000);
    }
  },
  handleClick: function (e) {
    this.setState({ disabled: true });
    this.props.publishStory(e);
  },
  render: function () {
    if (this.state.story && this.state.story.tags) {
      var tags = this.state.story.tags.map(function (tag) {
        return <Tag deleteTag={this.deleteTag} key={tag.id} tag={tag} />;
      }, this);
    }

    var tagMenu;
    if (this.state.menuActive) {
      tagMenu = (
        <div className="tag-menu">
          <h3>Ready to publish?</h3>
          <p>Add or change tags (up to 3):</p>
          <div className="tag-box group">
            {tags}
            <input
              autoFocus
              type="text"
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}
              placeholder="Add a tag..."
              value={this.state.value} />
            <div className={this.state.helperActive}>You can only add up to 3 tags</div>
          </div>

          <button
            disabled={this.state.disabled}
            id="full-publish"
            onClick={this.handleClick}
            className="primary"
            >
            Publish</button>
        </div>
      );
    }

    return (
      <div onClick={this.toggleView} className="prepublish primary button">
        <span>Publish &or;</span>
        <div id="pub-parent">
          {tagMenu}
        </div>
      </div>
    );
  },
  _onChange: function () {
    this.setState({ story: this.getStoryFromStore() });
  }
});

module.exports = PublishButton;

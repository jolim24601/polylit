var React = require('react'),
    Tag = require('../tags/tag'),
    TagApiUtil = require('../../util/tag_api_util'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store');

var PublishButton = React.createClass({
  getStoryFromStore: function () {
    return StoryStore.find(this.props.params.id);
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
  toggleMenu: function () {
    if (this.state.menuActive === "tag-menu hide") {
      this.setState({ menuActive: "tag-menu" });
    } else {
      this.setState({ menuActive: "tag-menu-hide" });
    }
  },
  handleChange: function (e) {
    if (this.state.story.tags.length < 3) {
      this.setState({ value: e.target.value });

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
      }, 3000);
    }
  },
  render: function () {
    var tags = this.state.story.tags.map(function (tag) {
      return <Tag tag={tag} />;
    });

    return (
      <button onClick={this.toggleMenu} className="prepublish primary">
        Publish &or;
        <div className={this.state.menuActive}>
          <h3>Ready to publish?</h3>
          <p>Add or change tags (up to 3):</p>
          <div className="tag-box">{tags}</div>
          <input type="text" onChange={this.handleChange} value={this.state.value} />
          <div className={this.state.helperActive}>You can only add up to 3 tags</div>
          <button onClick={this.props.saveStory} className="publish primary">Publish</button>
        </div>
      </button>
    );
  },
  _onChange: function () {
    this.setState({ story: this.getStoryFromStore() });
  }
});

module.exports = PublishButton;

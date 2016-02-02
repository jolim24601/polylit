var React = require('react'),
    ProseMirror = require('prosemirror/dist/edit'),
    pmFormat = require('prosemirror/dist/format'),
    pmModel = require('prosemirror/dist/model/'),
    Schema = require('prosemirror/dist/model/schema'),
    DefaultSchema = require('prosemirror/dist/model/defaultschema'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var Navbar = require('../navbar/navbar'),
    NavTools = require('../navbar/nav_tools'),
    ProfileTools = require('../navbar/profile_tools');

var StoryView = React.createClass({
  getStateFromStore: function () {
    return { story: StoryStore.find(this.props.params.id) };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.storyStoreListener = StoryStore.addListener(this._onChange);
    ApiUtil.fetchStory(this.props.params.id, function (story) {
      var pm = new ProseMirror.ProseMirror({ doc: story.node, docFormat: 'json' });
      pm.wrapper.firstChild.contentEditable = false;
      this.refs.pm.appendChild(pm.wrapper);
    }.bind(this));
  },
  componentWillMount: function () {
  },
  componentWillUnmount: function () {
    this.storyStoreListener.remove();
  },
  render: function () {
    // pmFormat, pmModel, Schema, DefaultSchema, ProseMirror;

    var editLink, editButton;
    if (CurrentAuthorStore.currentAuthor() && this.state.story &&
        CurrentAuthorStore.currentAuthor().id === this.state.story.author.id) {
      editLink = "#/stories/" + this.state.story.id + "/edit";
      editButton = <a className="story-edit button" href={editLink}>Edit</a>;
    }

    return (
      <article className="story">
        <Navbar>
          {editButton}
          <NavTools />
        </Navbar>
        <div ref="pm"></div>
      </article>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = StoryView;

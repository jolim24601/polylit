var React = require('react'),
    ProseMirror = require('prosemirror/dist/edit'),
    pmFormat = require('prosemirror/dist/format'),
    pmModel = require('prosemirror/dist/model/'),
    Schema = require('prosemirror/dist/model/schema'),
    DefaultSchema = require('prosemirror/dist/model/defaultschema'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store');

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
    ApiUtil.fetchStory(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.storyStoreListener.remove();
  },
  render: function () {
    var story = this.state.story.node;
    var pmNode, pmDOMFragment, pmHTML;
    pmFormat, pmModel, Schema, DefaultSchema, ProseMirror;
    if (typeof story !== 'undefined') {
      pmNode = DefaultSchema.defaultSchema.nodeFromJSON(story);
      pmDOMFragment = pmFormat.toDOM(pmNode);
      pmHTML = pmFormat.toHTML(pmNode);
      $(".ProseMirror-content").append(pmDOMFragment);
    }

    return (
      <article className="story">
        <Navbar><NavTools /></Navbar>
        <div className="ProseMirror-content"></div>
      </article>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = StoryView;

var React = require('react'),
    ProseMirror = require('prosemirror/dist/edit'),
    ApiActions = require('../../actions/api_actions'),
    ApiUtil = require('../../util/api_util'),
    AuthorStore = require('../../stores/author_store'),
    StoryStore = require('../../stores/story_store'),
    AuthorCard = require('../authors/author_card'),
    objectAssign = require('object-assign'),
    StoryFooter = require('./story_footer'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var Navbar = require('../navbar/navbar'),
    NavTools = require('../navbar/nav_tools'),
    ProfileTools = require('../navbar/profile_tools');

var StoryView = React.createClass({
  getStateFromStore: function () {
    var state = { story: StoryStore.find(this.props.params.id), author: null };
    if (state.story) {
      return objectAssign(state, { author: AuthorStore.find(state.story.author_id) });
    }
    return state;
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  fetchStory: function (id) {
    ApiUtil.fetchStory(id, function (story) {
      var pm = new ProseMirror.ProseMirror({ doc: story.node, docFormat: 'json' });
      pm.wrapper.firstChild.contentEditable = false;
      ApiActions.receiveSingleStory(story);
      this.refs.pm.appendChild(pm.wrapper);
      this.setState({ author: story.author });
    }.bind(this));
  },
  componentWillReceiveProps: function (newProps) {
    // Unfortunately not the React way, this is a workaround.
    this.refs.pm.removeChild(this.refs.pm.firstChild);
    this.fetchStory(newProps.params.id);
  },
  componentDidMount: function () {
    this.authorStoreListener = AuthorStore.addListener(this._onChange);
    this.storyStoreListener = StoryStore.addListener(this._onChange);
    this.fetchStory(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.authorStoreListener.remove();
    this.storyStoreListener.remove();
  },
  render: function () {
    var editLink, editButton, authorCard;
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

        <div className="story-author-header group">
          <AuthorCard author={this.state.story.author} />
          <small>{this.state.story.lastUpdated}</small>
          &middot;
          <small> {this.state.story.readTime}</small>
          <div ref="pm"></div>
        </div>

        <StoryFooter story={this.state.story} tags={this.state.story.tags} />
      </article>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = StoryView;

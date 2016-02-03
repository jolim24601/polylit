var React = require('react'),
    ProseMirror = require('prosemirror/dist/edit'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    AuthorCard = require('../authors/author_card'),
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
  fetchStory: function (id) {
    ApiUtil.fetchStory(id, function (story) {
      var pm = new ProseMirror.ProseMirror({ doc: story.node, docFormat: 'json' });
      pm.wrapper.firstChild.contentEditable = false;
      this.refs.pm.appendChild(pm.wrapper);
    }.bind(this));
  },
  componentWillReceiveProps: function (newProps) {
    // jules read this!!!
    // unfortunately not the React way, this is a workaround.
    this.refs.pm.removeChild(this.refs.pm.firstChild);
    this.fetchStory(newProps.params.id);
  },
  componentDidMount: function () {
    this.storyStoreListener = StoryStore.addListener(this._onChange);
    this.fetchStory(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.storyStoreListener.remove();
  },
  render: function () {
    var authorCard, editLink, editButton;
    if (CurrentAuthorStore.currentAuthor() && this.state.story &&
        CurrentAuthorStore.currentAuthor().id === this.state.story.author.id) {
      editLink = "#/stories/" + this.state.story.id + "/edit";
      editButton = <a className="story-edit button" href={editLink}>Edit</a>;

      authorCard = (
        <div className="story-author-header group">
          <AuthorCard author={this.state.story.author} />
        </div>
      );
    }

    return (
      <article className="story">
        <Navbar>
          {editButton}
          <NavTools />
        </Navbar>
        {authorCard}
        <div ref="pm"></div>
      </article>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = StoryView;

var React = require('react'),
    AuthorStore = require('../../stores/author_store'),
    ApiUtil = require('../../util/api_util'),
    AuthorEditable = require('./author_editable'),
    StoryIndexItem = require('../stories/story_index_item'),
    ApiActions = require('../../actions/api_actions'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var Navbar = require('../navbar/navbar'),
    NavTools = require('../navbar/nav_tools');

var AuthorProfile = React.createClass({
  getStateFromStore: function () {
    return { author: AuthorStore.find(this.props.params.id), stories: StoryStore.all() };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchAuthor(newProps.params.id, function (author) {
      ApiActions.receiveAuthorStories(author.stories);
    });
  },
  componentDidMount: function () {
    this.listener = AuthorStore.addListener(this._onChange);
    this.storyListener = StoryStore.addListener(this._onChange);
    ApiUtil.fetchAuthor(this.props.params.id, function (author) {
      ApiActions.receiveAuthorStories(author.stories);
    });
  },
  componentWillUnmount: function () {
    this.listener.remove();
    this.storyListener.remove();
  },
  render: function () {
    var author = this.state.author;

    if (typeof this.state.author.id === 'undefined'
        || this.state.author.stories.length !== StoryStore.all().length) {
      return (
        <div className="spinner">
          <small className="loading">Loading...</small>
        </div>
      );
    }

    var authorEditable, authorStoriesIndex;
    var isOwner = author.id === CurrentAuthorStore.currentAuthor().id;
    authorEditable = <AuthorEditable authorId={author.id} isOwner={isOwner} />;
    authorStoriesIndex = author.stories.map(function (story) {
      return <StoryIndexItem key={story.id} story={story} author={author} />;
    });

    return (
      <div className="author-profile">
        <Navbar><NavTools /></Navbar>
        {authorEditable}
        <ul className="author story-feed">
          <li className="heading-title">Latest</li>
          {authorStoriesIndex}
        </ul>
        <div className="rec-stories" />
      </div>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = AuthorProfile;

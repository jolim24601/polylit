var React = require('react'),
    AuthorStore = require('../../stores/author_store'),
    ApiUtil = require('../../util/api_util'),
    AuthorEditable = require('./author_editable'),
    StoryIndexItem = require('../stories/story_index_item');

var AuthorProfile = React.createClass({
  getStateFromStore: function () {
    return { author: AuthorStore.find(this.props.params.id) };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.authorStoreListener = AuthorStore.addListener(this._onChange);
    ApiUtil.fetchAuthor(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.authorStoreListener.remove();
  },
  render: function () {
    var author = this.state.author;
    var authorProfileBanner, authorStoriesIndex;
    if (typeof this.state.author.id !== 'undefined') {
      authorProfileBanner = <AuthorEditable author={author} />;
      authorStoriesIndex = author.stories.map(function (story) {
        return <StoryIndexItem key={story.id} story={story} author={author} />;
      });
    }
    return (
      <div className="author-profile">
        {authorProfileBanner}
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

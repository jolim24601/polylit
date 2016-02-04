var React = require('react'),
    AuthorStore = require('../../stores/author_store'),
    AuthorCard = require('../authors/author_card'),
    StoryIndexItemFooter = require('./index_item_footer');

var StoryIndexItem = React.createClass({
  getStateFromStore: function () {
    return { author: AuthorStore.find(this.props.story.author_id) };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.listener = AuthorStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  render: function () {
    var story = this.props.story;
    var link = "#/stories/" + story.id;

    var bannerImage;
    if (story.banner) {
      bannerImage = <img className="banner-index" src={story.banner} />;
    }

    // listen for any follow updates on the author
    var author;
    if (this.state.author.id) {
      author = this.state.author;
    } else {
      author = this.props.story.author;
    }

    return (
      <li className="story-feed-item">
        <AuthorCard author={author} />
        <small>{story.timeAgo} ago </small>
        &middot;
        <small> {story.readTime}</small>
        <a className="banner-link" href={link}>{bannerImage}</a>
        <h3 className="feed-title"><a href={link}>{story.title}</a></h3>
        <p className="feed-subtitle">{story.subtitle}</p>
        <small><a href={link}>Read more...</a></small>
        <StoryIndexItemFooter story={story} />
      </li>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = StoryIndexItem;

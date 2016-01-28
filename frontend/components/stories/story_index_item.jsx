var React = require('react'),
    AuthorCard = require('../authors/author_card'),
    StoryIndexItemFooter = require('./index_item_footer');

var StoryIndexItem = React.createClass({
  render: function () {
    var story = this.props.story;
    var link = "#/stories/" + story.id;
    return (
      <li className="story-feed-item">
        <AuthorCard author={story.author} />
        <small>{story.timeAgo} ago </small>
        &middot;
        <small> {story.readTime}</small>
        <h3 className="feed-title"><a href={link}>{story.title}</a></h3>
        <p className="feed-subtitle">{story.subtitle}</p>
        <small><a href={link}>Read more...</a></small>
        <StoryIndexItemFooter story={story} />
      </li>
    );
  }
});

module.exports = StoryIndexItem;

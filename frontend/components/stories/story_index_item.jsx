var React = require('react');

var StoryIndexItem = React.createClass({
  render: function () {
    var story = this.props.story;
    var link = "#/stories/" + story.id;
    return (
      <li className="story-feed-item">
        <div className="mini-profile">
          <a href={story.author.url}>{story.author.name}</a>
        </div>
        <small>{story.timeAgo} ago </small>
        &middot;
        <small> {story.readTime}</small>
        <h3 className="feed-title"><a href={link}>{story.title}</a></h3>
        <p className="feed-subtitle">{story.subtitle}</p>
        <small><a href={link}>Read more...</a></small>
      </li>
    );
  }
});

module.exports = StoryIndexItem;

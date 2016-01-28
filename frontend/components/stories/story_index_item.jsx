var React = require('react');

var StoryIndexItem = React.createClass({
  render: function () {
    var story = this.props.story;
    var link = "#/stories/" + story.id;
    return (
      <li className="story-feed-item">
        <a href={story.author.url}>{story.author.name}</a>
        <h3><a href={link}>{story.title}</a></h3>
        <small>{story.time_ago_in_words} ago</small>&middot;<small>{story.readTime} minute read</small>
        <p>{story.subtitle}</p>
        <a href={link}>Read more...</a>
      </li>
    );
  }
});

module.exports = StoryIndexItem;

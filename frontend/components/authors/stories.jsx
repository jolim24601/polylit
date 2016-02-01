var React = require('react'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    Navbar = require('../navbar/navbar'),
    NavTools = require('../navbar/nav_tools');

var AuthorStories = React.createClass({
  getInitialState: function () {
    return { published: false };
  },
  handleClick: function (e) {
    if (e.target.innerHTML === "Drafts") {
      this.setState({ published: false });
    } else if (e.target.innerHTML === "Public") {
      this.setState({ published: true });
    }
  },
  render: function () {
    var author = CurrentAuthorStore.currentAuthor();

    var storyItems = author.stories.map(function (story) {
      if (this.state.published === story.published) {
        return (
          <li key={story.id}>
            <h3>{story.title}</h3>
            <small>Last edited {story.timeAgo} ago </small>
            &middot;
            <small> {story.readTime}</small>
            &middot; <span>&or;</span>
            <p>{story.subtitle}</p>
          </li>
        );
      }
    });

    return (
      <main>
        <Navbar>
          <NavTools />
          <div className="list-header">
            <h1>Your stories</h1>
            <ul className="navtabs group">
              <li onClick={this.handleClick}>Drafts</li>
              <li onClick={this.handleClick}>Public</li>
            </ul>
          </div>
        </Navbar>

        <ul className="author story-feed">
          {storyItems}
        </ul>
      </main>
    );
  }
});

module.exports = AuthorStories;

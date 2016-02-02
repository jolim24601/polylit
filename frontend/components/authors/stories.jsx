var React = require('react'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    CurrentAuthorActions = require('../../actions/current_author_actions'),
    Navbar = require('../navbar/navbar'),
    EditMenu = require('./edit_menu'),
    ApiUtil = require('../../util/api_util'),
    NavTools = require('../navbar/nav_tools');

var AuthorStories = React.createClass({
  getInitialState: function () {
    return { published: false, draftActive: "tab-active", pubActive: "" };
  },
  componentDidMount: function () {
    this.listener = CurrentAuthorStore.addListener(this._onChange);
    var author = CurrentAuthorStore.currentAuthor();
    // update store with author's stories
    ApiUtil.fetchAuthor(author.id,
      CurrentAuthorActions.receiveCurrentAuthor);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  handleClick: function (e) {
    if (e.target.innerHTML === "Drafts") {
      this.setState({ published: false, draftActive: "tab-active", pubActive: "" });
    } else if (e.target.innerHTML === "Public") {
      this.setState({ published: true, draftActive: "", pubActive: "tab-active" });
    }
  },
  render: function () {
    var author = CurrentAuthorStore.currentAuthor();

    if (author.stories) {
      var storyItems = author.stories.map(function (story) {
        var uniqueKey = new Date().getUTCMilliseconds();
        var storyLink = "#/stories/" + story.id;
        if (this.state.published === story.published) {
          return (
            <li className="draft-feed-item" key={story.id}>
              <div className="draft-content">
                <h3><a href={storyLink}>{story.title}</a></h3>
                <small>{story.draftedAgo} </small>
                &middot;
                <small> {story.readTime}</small>
                &middot;
                <EditMenu story={story} key={uniqueKey} />
              </div>
            </li>
          );
        }
      }, this);
    }

    return (
      <main>
        <Navbar><NavTools /></Navbar>

        <div className="draft-list-header">
          <h1>Your stories</h1>
          <ul className="navtabs group">
            <li className={this.state.draftActive} onClick={this.handleClick}>Drafts</li>
            <li className={this.state.pubActive} onClick={this.handleClick}>Public</li>
          </ul>
        </div>

        <ul className="story-feed draft-feed">
          {storyItems}
        </ul>
      </main>
    );
  },
  _onChange: function () {
    this.forceUpdate();
  }
});

module.exports = AuthorStories;

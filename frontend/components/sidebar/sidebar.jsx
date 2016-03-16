var React = require('react'),
    Tag = require('../tags/tag'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag_store'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    FontAwesome = require('react-fontawesome');

var Sidebar = React.createClass({
  getInitialState: function () {
    return { topTags: [], topStories: [] };
  },
  componentDidMount: function () {
    this.tagListener = TagStore.addListener(this.handleTags);
    this.currentAuthorListener = CurrentAuthorStore.addListener(this._onChange);

    this.fetchTopStories();
    TagApiUtil.fetchTopTags();
  },
  componentWillUnmount: function () {
    this.tagListener.remove();
    this.currentAuthorListener.remove();
  },
  fetchTopStories: function () {
    if (!StoryStore.topStories()[0]) {
      var pageParams = { page: 1 };
      ApiUtil.fetchTopStories(pageParams, this.handleStories);
    } else {
      this.handleStories();
    }
  },
  handleTags: function () {
    this.setState({ topTags: TagStore.topTags() });
  },
  handleStories: function () {
    this.setState({ topStories: StoryStore.topStories().slice(0, 10) });
  },
  createTags: function (tags) {
    if (tags && tags.length > 0) {
      return tags.map(function (tag) {
        return <li key={tag.id} className="sidebar-tag"><Tag tag={tag} /></li>;
      });
    }
    return [];
  },
  render: function () {
    var topStories, topTags, followedTags;
    if (this.state.topTags && this.state.topStories) {
      topStories = this.state.topStories.map(function (story) {
        var truncatedTitle = story.title.slice(0, 25);
        if (story.title.length > 25) { truncatedTitle += "..."; }
        var storyLink = "#/stories/" + story.id;
        var authorLink = "#/authors/" + story.author.id;

        return (
          <li key={story.id}>
            <a href={storyLink}>{truncatedTitle}</a>
            <a className="sidebar-author" href={authorLink}>{story.author.name}</a>
          </li>
        );
      });

      topTags = this.createTags(this.state.topTags);
      followedTags = this.createTags(CurrentAuthorStore.currentAuthor().tags);
    }

    return (
      <aside className="sidebar hide">
        <div className="sidebox group">
          <h3 className="sidebar-header">MOST POPULAR TAGS</h3>
          <ul className="top-tags">
            {topTags}
          </ul>
        </div>
        <div className="sidebox group">
          <h3 className="sidebar-header">TAGS YOU FOLLOW</h3>
          <ul className="followed-tags">
            {followedTags}
          </ul>
        </div>
        <div className="sidebox group">
          <h3 className="sidebar-header">TOP STORIES ON POLYLIT</h3>
          <a className="more-top-stories" href="#/top-stories">SEE MORE</a>

          <ol className="top-five">
            {topStories}
          </ol>
        </div>
      </aside>
    );
  },
  _onChange: function () {
    this.forceUpdate();
  }
});

module.exports = Sidebar;

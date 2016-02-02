var React = require('react'),
    TagStore = require('../../stores/tag_store'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var Sidebar = React.createClass({
  render: function () {
    var topStories = StoryStore.all();
    var topTags = TagStore.all();
    var followedTags = CurrentAuthorStore.currentAuthor().tags;

    return (
      <aside className="home-sidebar">
        <ul className="top-tags">

        </ul>
        <ul className="followed-tags">

        </ul>
        <ul className="top-five">

        </ul>
      </aside>
    );
  }
});

module.exports = Sidebar;

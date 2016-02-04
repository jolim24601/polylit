var React = require('react'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    StoryStore = require('../../stores/story_store'),
    ApiUtil = require('../../util/api_util');

var infiniteScroller = require('../../util/helpers').infiniteScroller;

var Navbar = require('../navbar/navbar'),
    Sidebar = require('../sidebar/sidebar'),
    NavTools = require('../navbar/nav_tools');

var BookmarksIndex = React.createClass({
  render: function () {
    return (
      <div></div>
    );
  }
});

module.exports = BookmarksIndex;

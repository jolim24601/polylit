var React = require('react');

var HomeTools = React.createClass({
  render: function () {
    return (
      <ul className="navbar-center group floatLeft">
        <li><a href="#">HOME</a></li>
        <li><a href="#/stories">TOP STORIES</a></li>
        <li><a href="#">BOOKMARKS</a></li>
      </ul>
    );
  }
});

module.exports = HomeTools;

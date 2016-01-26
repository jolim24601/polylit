var React = require('react'),
    ProfileButton = require('./profile_button'),
    PredictiveSearch = require('../predictive_search'),
    Notifications = require('./notifications');

var Navbar = React.createClass({
  render: function () {
    return (
      <header className="navbar">
        <nav className="navbar-nav group">
          <div className="navbar-logo">
            <h2 className="logo floatLeft"><a href="#">Polylit</a></h2>
          </div>

          <ul className="navbar-center group floatLeft">
            <li><a href="#">HOME</a></li>
            <li><a href="#">TOP STORIES</a></li>
            <li><a href="#">BOOKMARKS</a></li>
          </ul>

          <ul className="navbar-tools group floatRight">
              <li><a href="#/new-story">Write a story</a></li>
              <li><Notifications /></li>
              <li><ProfileButton /></li>
              <li><PredictiveSearch /></li>
              <li><a href="authors/new">Sign In / Sign Up</a></li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Navbar;

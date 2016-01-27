var React = require('react'),
    Notifications = require('./notifications'),
    ProfileButton = require('./profile_button'),
    PredictiveSearch = require('./predictive_search');

var NavTools = React.createClass({
  render: function () {
    return (
      <ul className="navbar-tools group floatRight">
          <li><a href="#/new-story">Write a story</a></li>
          <li><Notifications /></li>
          <li><ProfileButton /></li>
          <li><PredictiveSearch /></li>
          <li>
            <button className="primary">
              <a href="authors/new">Sign In / Sign Up</a>
            </button>
          </li>
      </ul>
    );
  }
});

module.exports = NavTools;

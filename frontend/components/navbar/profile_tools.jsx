var React = require('react'),
    Notifications = require('../buttons/notifications'),
    ProfileButton = require('../buttons/profile_button');

var ProfileTools = React.createClass({
  render: function () {
    return (
      <div className="profile-tools group float-left">
        <li><ProfileButton /></li>
      </div>
    );
  }
});

module.exports = ProfileTools;

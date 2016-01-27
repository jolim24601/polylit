var React = require('react'),
    Notifications = require('./notifications'),
    ProfileButton = require('./profile_button'),
    PublishButton = require('./publish_button');

var WriteTools = React.createClass({
  render: function () {
    return (
      <ul className = "navbar-tools group floatRight">Share
        <li><PublishButton publishStory={this.props.publishStory} /></li>
        <li><Notifications /></li>
        <li><ProfileButton /></li>
      </ul>
    );
  }
});

module.exports = WriteTools;

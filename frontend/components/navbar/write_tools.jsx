var React = require('react'),
    Notifications = require('./notifications'),
    ProfileButton = require('./profile_button'),
    Publish = require('./publish');

var WriteTools = React.createClass({
  render: function () {
    return (
      <div>Share
        <Publish publishStory={this.props.publishStory} />
        <Notifications />
        <ProfileButton />
      </div>
    );
  }
});

module.exports = WriteTools;

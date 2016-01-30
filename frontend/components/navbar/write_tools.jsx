var React = require('react'),
    PublishButton = require('../buttons/publish_button');

var WriteTools = React.createClass({
  render: function () {
    return (
      <ul className = "navbar-tools group floatLeft">
        <li><button className="share-button">Share</button></li>
        <li><PublishButton publishStory={this.props.publishStory} /></li>
        <li className="tag-menu"></li>
        <li className="divider"></li>
      </ul>
    );
  }
});

module.exports = WriteTools;

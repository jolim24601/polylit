var React = require('react'),
    PublishButton = require('../buttons/publish_button');

var WriteTools = React.createClass({
  render: function () {
    return (
      <ul className = "write-tools group floatLeft">
        <li><button className="share-button">Share</button></li>
        <li><PublishButton saveStory={this.props.saveStory} /></li>
        <li className="tag-menu"></li>
        <span className="divider"></span>
      </ul>
    );
  }
});

module.exports = WriteTools;

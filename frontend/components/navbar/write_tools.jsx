var React = require('react'),
    PublishButton = require('../buttons/publish_button');

var WriteTools = React.createClass({
  render: function () {
    return (
      <ul className = "navbar-tools group floatRight">
        <li><button>Share</button></li>
        <li><PublishButton publishStory={this.props.publishStory} /></li>
        <li><button>...</button></li>
        <li className="divider"></li>
      </ul>
    );
  }
});

module.exports = WriteTools;

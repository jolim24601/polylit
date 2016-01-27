var React = require('react');

var PublishButton = React.createClass({
  render: function () {
    return (
      <button className="primary" onClick={this.props.publishStory}>
        Publish &or;
      </button>
    );
  }
});

module.exports = PublishButton;

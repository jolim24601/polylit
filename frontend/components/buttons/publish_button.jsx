var React = require('react');

var PublishButton = React.createClass({
  render: function () {
    return (
      <button id="publish-button" className="primary">
        Publish &or;
      </button>
    );
  }
});

module.exports = PublishButton;

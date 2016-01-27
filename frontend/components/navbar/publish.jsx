var React = require('react');

var Publish = React.createClass({
  render: function () {
    return (
      <button className="primary" onClick={this.props.publishStory}>
        Publish &or;
      </button>
    );
  }
});

module.exports = Publish;

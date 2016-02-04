var React = require('react');

var WriteTools = React.createClass({
  render: function () {
    return (
      <ul className = "write-tools group floatLeft">
        <li>{this.props.children}</li>
        <span className="divider"></span>
      </ul>
    );
  }
});

module.exports = WriteTools;

var React = require('react');

var Editor = React.createClass({
  render: function () {
    return (
      <div contentEditable='true 'id='editor'>
        Edit me!
      </div>
    );
  }
});

module.exports = Editor;

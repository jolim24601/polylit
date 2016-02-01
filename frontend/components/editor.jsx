var React = require('react');
var ProseMirror = require('prosemirror/dist/edit');
var objectAssign = require('object-assign');

var options = {
                menuBar: false,
                tooltipMenu: true,
                autoInput: true,
                docFormat: 'html'
              };

var Editor = React.createClass({
  render: function () {
    return (
      <div ref="pm"></div>
    );
  },
  componentWillUpdate: function (props) {
    if (props.value) {
      var value = props.value || '';
      if (value !== this._lastValue) {
        this.pm.setContent(value, options.docFormat);
      }
    }
  },
  componentWillMount: function () {
    this._lastValue = this.props.value;
    this.pm = new ProseMirror.ProseMirror(objectAssign({doc: this._lastValue}, options));
  },
  componentDidMount: function () {
    this.refs.pm.appendChild(this.pm.wrapper);
    this.pm.on("change", function () {
      var callback = this.props.onChange;
      if (callback) {
        this._lastValue = this.pm.getContent(options.docFormat);
        callback(this._lastValue);
      }
    }.bind(this));
  },
  getContent: function () {
    return this.pm.getContent(options.docFormat);
  }
});

module.exports = Editor;

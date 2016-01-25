var React = require('react');
var ProseMirror = require('prosemirror/dist/edit');

var Editor = React.createClass({
  render: function () {
    return (
      <div ref="pm"></div>
    );
  },
  componentWillUpdate: function (props) {
    if (props.value || props.valueLink) {
      var value = props.value || (props.valueLink || props.valueLink.value) || '';
      if (value !== this._lastValue) {
        this.pm.setContent(value, props.options.docFormat);
      }
    }
  },
  componentWillMount: function () {
    this._lastValue = this.props.value || (this.props.valueLink || this.props.valueLink.value) || this.props.defaultValue;
    this.pm = new ProseMirror.ProseMirror(Object.assign({doc: this._lastValue}, this.props.options));
  },
  // places the Prosemirror div, adds a listener to it
  componentDidMount: function () {
    this.refs.pm.appendChild(this.pm.wrapper);
    this.pm.on("change", function () {
      var callback = this.props.onChange || this.props.valueLink && this.props.valueLink.requestChange;
      if (callback) {
        this._lastValue = this.pm.getContent(this.props.options.docFormat);
        callback(this._lastValue);
      }
    }.bind(this));
  },
  // updates options...not available atm.
  componentDidUpdate: function (options) {
    var current = this.props.options;
    var self = this;
    Object.keys(current).forEach(function (k) {
      if (current[k] !== options[k]) {
        self.pm.setOption(k, current[k]);
      }
    });
  },
  getContent: function () {
    return this.pm.getContent(this.props.options.docFormat);
  }
});

module.exports = Editor;

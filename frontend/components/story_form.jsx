var React = require('react'),
    Editor = require('../components/editor');

require('prosemirror/dist/inputrules/autoinput');
require('prosemirror/dist/menu/menubar');
require('prosemirror/dist/menu/tooltipmenu');
require('prosemirror/dist/menu/menu');

var StoryForm = React.createClass({
  getInitialState: function () {
    return ({
      options: {
        menuBar: true,
        tooltipMenu: true,
        autoInput: true,
        docFormat: 'html'
      },
      output: '<h3>Title</h3><p>Tell a story...</p>'
    });
  },
  render: function () {
    return (
      <div className='story-form'>
        <Editor value={this.state.output} onChange={this.updateOutput} options={this.state.options} ref="pm" />
      </div>
    );
  },
  updateOutput: function (output) {
    this.setState({ output });
  },
  componentDidMount: function () {
    this.updateOutput(this.refs.pm.getContent());
  }
});

module.exports = StoryForm;

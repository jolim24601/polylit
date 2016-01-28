var React = require('react'),
    Editor = require('../editor'),
    ApiUtil = require('../../util/api_util'),
    PublishButton = require('../navbar/publish_button'),
    History = ReactRouter = require('react-router').hashHistory;

require('prosemirror/dist/inputrules/autoinput');
require('prosemirror/dist/menu/menubar');
require('prosemirror/dist/menu/tooltipmenu');
require('prosemirror/dist/menu/menu');
var pmFormat = require('prosemirror/dist/format');

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
  publishStory: function (e) {
    e.preventDefault();
    var pmNode = this.refs.pm.pm.getContent();
    var story = {};
    story.published = true;
    story.title = pmNode.firstChild.textContent;
    story.subtitle = pmNode.iter(1, 2).next().textContent;
    story.node = JSON.stringify(pmNode.toJSON());
    story.wordcount = pmFormat.toText(pmNode).length;
    ApiUtil.publishStory(story, function () {
      History.push('/stories');
    });
  },
  render: function () {
    return (
      <div className='story-form'>
        <Editor value={this.state.output} onChange={this.updateOutput}
          options={this.state.options} ref="pm" />
        <PublishButton publishStory={this.publishStory} />
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

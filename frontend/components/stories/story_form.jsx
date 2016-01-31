var React = require('react'),
    Editor = require('../editor'),
    ApiUtil = require('../../util/api_util'),
    hashHistory = require('react-router').hashHistory;

require('prosemirror/dist/inputrules/autoinput');
require('prosemirror/dist/menu/menubar');
require('prosemirror/dist/menu/tooltipmenu');
require('prosemirror/dist/menu/menu');
var pmFormat = require('prosemirror/dist/format');

var Navbar = require('../navbar/navbar'),
    WriteTools = require('../navbar/write_tools'),
    ProfileTools = require('../navbar/profile_tools');

var StoryForm = React.createClass({
  getInitialState: function () {
    return ({
      options: {
        menuBar: false,
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
    story.node = JSON.stringify(pmNode.toJSON());

    var words = pmFormat.toText(pmNode).split(/\s+/);
    story.wordcount = words.length;
    var titleLength = story.title.split(/\s+/).length;
    story.subtitle = words
      .slice(titleLength, titleLength + 60)
      .join(' ');
    if (words.length >= 60) { story.subtitle += '...'; }

    ApiUtil.publishStory(story, function () {
      hashHistory.push('/stories');
    });
  },
  render: function () {
    return (
      <div className="main-content">
        <Navbar>
          <div className="floatRight"><WriteTools /><ProfileTools /></div>
        </Navbar>
        <div className="story">
          <Editor value={this.state.output} onChange={this.updateOutput}
            options={this.state.options} ref="pm" />
        </div>
      </div>
    );
  },
  updateOutput: function (output) {
    this.setState({ output: output });
  },
  componentDidMount: function () {
    this.updateOutput(this.refs.pm.getContent());
    this.publishButton = document.getElementById('publish-button');
    this.publishListener = this.publishButton.addEventListener('click', this.publishStory);
  },
  componentWillUnmount: function () {
    this.publishButton.removeEventListener('click', this.publishListener, false);
  }
});

module.exports = StoryForm;

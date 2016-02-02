var React = require('react'),
    Editor = require('../editor'),
    StoryStore = require('../../stores/story_store'),
    ApiUtil = require('../../util/api_util'),
    TagApiUtil = require('../../util/tag_api_util'),
    History = require('react-router').History,
    objectAssign = require('object-assign');

var pmFormat = require('prosemirror/dist/format');
var ProseMirror = require('prosemirror/dist/edit');

var Navbar = require('../navbar/navbar'),
    WriteTools = require('../navbar/write_tools'),
    PublishButton = require('../buttons/publish_button'),
    ProseMirror = require('prosemirror/dist/edit'),
    ProfileTools = require('../navbar/profile_tools');


var blankAttrs = ({
                    story: {
                      title: '',
                      subtitle: '',
                      wordcount: 0,
                      published: false
                    },
                    storyId: '',
                    draftState: '',
                    verb: 'POST',
                    value: '<h3></h3>'
                });

var StoryForm = React.createClass({
  mixins: [History],

  fetchStory: function () {
    ApiUtil.fetchStory(this.props.params.id, function (story) {
      // wrap json in PM object so we can serialize it into HTML
      var pm = new ProseMirror.ProseMirror({ doc: story.node, docFormat: 'json' });

      var newState = objectAssign(blankAttrs, {
        story: {
          title: story.title,
          subtitle: story.subtitle,
          wordcount: story.wordcount,
          published: story.published
        },
        storyId: story.id,
        verb: 'PATCH',
        value: pm.getContent('html')
      });

      this.setState(newState);

    }.bind(this));
  },
  getInitialState: function () {
    return blankAttrs;
  },
  saveStory: function (e) {
    var pmNode = this.refs.pm.pm.getContent();
    var story = objectAssign({}, this.state.story);

    if (e && e.target.id === 'full-publish') {
      e.preventDefault();
      story.published = true;
      this.setState({ published: true });
    }

    story.title = pmNode.firstChild.textContent;

    var words = pmFormat.toText(pmNode).split(/\s+/);
    story.wordcount = words.length;
    var titleLength = story.title.split(/\s+/).length;
    story.subtitle = words
      .slice(titleLength, titleLength + 60)
      .join(' ');
    if (words.length >= 60) { story.subtitle += '...'; }


    story.node = JSON.stringify(this.refs.pm.pm.getContent('json'));
    var params = objectAssign({}, {
      story: story,
      verb: this.state.verb,
      storyId: this.state.storyId
    });

    var form = this;
    ApiUtil.saveStory(params, function (saved) {
      setTimeout(function () {
        form.setState({ storyId: saved.id, verb: 'PATCH', draftState: 'Saved.' });
        clearInterval(form.intervalId);
        form.intervalId = null;

        if (e && e.target.id === 'full-publish') {
          form.history.pushState(null, '/stories/' + saved.id, {});
        }
      }, 1000);
    });
  },
  showHelper: function () {
    // Author can save after writing
  },
  render: function () {
    var publishButton;
    if (this.state.storyId) {
      publishButton = <PublishButton storyId={this.state.storyId} saveStory={this.saveStory} />;
    } else {
      publishButton = <button onClick={this.showHelper} className="dummy-button primary">Publish &or;</button>;
    }

    return (
      <div className="main-content">
        <Navbar>
          <span className="draft-message floatLeft">{this.state.draftState}</span>
          <div className="floatRight">
            <WriteTools>{publishButton}</WriteTools>
            <ProfileTools />
          </div>
        </Navbar>
        <div className="story">
          <Editor value={this.state.value} onChange={this.updateOutput} ref="pm" />
        </div>
      </div>
    );
  },
  handleDraft: function () {
    var form = this;
    if (!this.intervalId && this.refs.pm.pm.getContent('text')) {
      this.intervalId = setTimeout(function () {
        form.setState({ draftState: 'Saving...' });
        form.saveStory();
      }, 1000);
    }
  },
  updateOutput: function (value) {
    var draftState = this.intervalId ? this.state.draftState : 'Draft';
    this.setState({ draftState: draftState, value: value },
      this.handleDraft);
  },
  componentDidMount: function () {
    if (this.props.params.id) {
      return this.fetchStory();
    }

    // this.updateOutput(this.refs.pm.getContent());
    document.querySelector('.ProseMirror-content').focus();
  },
  componentWillUnmount: function () {
    clearInterval(this.intervalId);
  }
});

module.exports = StoryForm;

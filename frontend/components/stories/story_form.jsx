var React = require('react'),
    Editor = require('../editor'),
    StoryStore = require('../../stores/story_store'),
    ApiUtil = require('../../util/api_util'),
    TagApiUtil = require('../../util/tag_api_util'),
    History = require('react-router').History,
    CurrentAuthorStore = require('../../stores/current_author_store'),
    AuthorCard = require('../authors/author_card'),
    objectAssign = require('object-assign');

var ProseMirror = require('prosemirror/dist/edit');

var Navbar = require('../navbar/navbar'),
    WriteTools = require('../navbar/write_tools'),
    ShortcutHelper = require('./shortcuts'),
    PublishButton = require('../buttons/publish_button'),
    ProfileTools = require('../navbar/profile_tools');

var blankAttrs = ({
                    story: {
                      title: '',
                      subtitle: '',
                      wordcount: 0,
                      published: false
                    },
                    storyId: '',
                    authorId: '',
                    draftState: '',
                    verb: 'POST',
                    value: '<h3></h3>'
                });

var StoryForm = React.createClass({
  mixins: [History],

  fetchStory: function () {
    ApiUtil.fetchStory(this.props.params.id, function (story) {
      if (!this._isAuthorOwner(story.author.id)) { this._redirect(); return; }
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
        authorId: story.author.id,
        verb: 'PATCH',
        value: pm.getContent('html')
      });

      this.setState(newState);

    }.bind(this));
  },
  getInitialState: function () {
    return blankAttrs;
  },
  componentWillReceiveProps: function () {
    // force page refresh if they try to go to new story or access a different story id while in edit mode
    document.location.reload();
  },
  saveStory: function (cb) {
    var params = this._createParams();

    ApiUtil.saveStory(params, function (saved) {
      this.timeoutId = null;
      this.setState({ storyId: saved.id, verb: 'PATCH', draftState: 'Saved.' });
      cb && cb();
    }.bind(this));
  },
  publishStory: function (e) {
    e.preventDefault();

    var story = objectAssign({}, this.state.story);
    story.published = true;
    // pull first image found in body and set as the banner image for index
    var image = document.querySelector('.ProseMirror-content')
                        .querySelector('img');
    if (image) { story.banner = image.src; }

    this.setState({ story: story }, function () {
      this.saveStory(
        this.history.pushState.bind(null, '/stories/' + this.state.story.id, {})
      );
    }.bind(this));
  },
  render: function () {
    var publishButton;
    if (this.state.storyId) {
      publishButton = <PublishButton storyId={this.state.storyId} publishStory={this.publishStory} />;
    } else {
      publishButton = (
        <div>
          <button className="dummy-button primary">Publish &or;</button>
        </div>
      );
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
          <div className="story-author-header group">
            <AuthorCard author={CurrentAuthorStore.currentAuthor()} />
          </div>
          <Editor value={this.state.value} onChange={this.updateOutput} ref="pm" />
        </div>

        <ShortcutHelper />
      </div>
    );
  },
  updateOutput: function (value) {
    this.setState({ value: value }, this.handleDraft);
  },
  handleDraft: function () {
    if (!this.timeoutId
        && this.refs.pm.pm.getContent('text')) {

      this.timeoutId = setTimeout(function () {
        this.setState({ draftState: 'Saving...' }, this.saveStory);
      }.bind(this), 1500);
    }
  },
  componentDidMount: function () {
    if (this.props.params.id) {
      return this.fetchStory();
    }
    this.updateOutput(this.refs.pm.getContent());
    document.querySelector('.ProseMirror-content').focus();
  },
  componentWillUnmount: function () {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  },
  _isAuthorOwner: function (authorId) {
    if (authorId === CurrentAuthorStore.currentAuthor().id) {
      return true;
    }
    return false;
  },
  _redirect: function () {
    this.history.push('/');
  },
  _createParams: function () {
    var pm = this.refs.pm.pm;
    var pmNode = pm.getContent();
    var story = objectAssign({}, this.state.story);
    var words = pm.getContent('text').split(/\s+/);
    story.wordcount = words.length;

    // pull title and subtitle
    var lines = pm.getContent('text')
                  .split('\n')
                  .filter(function (line) { return line; });

    story.title = lines[0] || 'Untitled Story';
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

    return params;
  }
});

module.exports = StoryForm;

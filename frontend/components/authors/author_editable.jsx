var React = require('react'),
    AvatarEditable = require('./avatar_editable'),
    ApiUtil = require('../../util/api_util'),
    Follow = require('../buttons/follow'),
    AuthorStore = require('../../stores/author_store'),
    History = require('react-router').History,
    BioEditable = require('./bio_editable');

var AuthorEditable = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var author = AuthorStore.find(this.props.authorId);
    return {
      name: author.name,
      description: author.description,
      imageURL: author.avatar,
      imageFile: null,
      editable: false,
      disabled: false,
      showOverlay: false
    };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  openEdit: function () {
    this.setState({ editable: true });
  },
  refresh: function () {
    this.setState(this.getStateFromStore());
  },
  componentDidMount: function () {
    this.authorListener = AuthorStore.addListener(this.refresh);
  },
  componentWillUnmount: function () {
    this.authorListener.remove();
  },
  confirmDelete: function () {
    this.showOverlay();
  },
  showOverlay: function () {
    this.setState({ showOverlay: true });
  },
  hideOverlay: function () {
    this.setState({ showOverlay: false });
  },
  destroyAuthor: function () {
    ApiUtil.destroyAuthor(this.props.authorId, function () {
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  handleClick: function (e) {
    e.preventDefault();
    this.setState({ disabled: true });

    var formData = new FormData();
    if (this.state.imageFile) { formData.append('author[avatar]', this.state.imageFile); }
    if (this.state.name) { formData.append('author[pen_name]', this.state.name); }
    if (this.state.description) { formData.append('author[description]', this.state.description); }

    ApiUtil.editAuthor(this.props.authorId, formData, this.refresh);
  },
  handleUpload: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({ imageFile: file, imageURL: reader.result });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageFile: null, imageURL: '' });
    }
  },
  changeName: function (e) {
    this.setState({ name: e.target.value });
  },
  changeDescription: function (e) {
    this.setState({ description: e.target.value });
  },
  render: function () {
    if (this.state.showOverlay) {
      return (
        <div className="overlay">
          <div className="overlay-dialog">
            <h3>Request account deletion</h3>
            <p>
              Sorry to see you go! This action will delete all of your content permanently.
              Are you sure you want to do this?
            </p>

            <button className="submit-button primary" onClick={this.destroyAuthor}>
              Confirm deletion
            </button>
            <button onClick={this.hideOverlay}>Cancel</button>
          </div>
        </div>
      );
    }

    var field = this.state;
    var author = AuthorStore.find(this.props.authorId);
    var buttons = this._getButtons(author);
    var follow = this.props.isOwner ? null : <Follow followable={author}/>;

    return (
      <div className="profile-banner">
        <div className="inner-profile group">
          <BioEditable
            changeName={this.changeName}
            changeDescription={this.changeDescription}
            field={field}
            />

          <div className="social-button-set group">
            <small>Following {author.followingCount}</small>
            <small>Followers {author.follows.length}</small>
          </div>
          {buttons}

          <AvatarEditable
            editable={this.state.editable}
            defaultURL={author.avatar}
            imageURL={this.state.imageURL} handleUpload={this.handleUpload}
            />

          {follow}
        </div>
      </div>
    );
  },
  _getButtons: function (author) {
    if (this.state.editable && this.props.isOwner) {
      var deleteAccount = (
        <button id="delete-account" onClick={this.confirmDelete}>
          (Delete this account)
        </button>
      );
      // Prevent demo user from getting deleted!
      if (author.username === "leo_tolstoy") { deleteAccount = null; }

      return (
        <div className="author-edit-button">
          <button
            disabled={this.state.disabled}
            className="submit-button primary"
            onClick={this.handleClick}>Save
          </button>
          <button onClick={this.refresh}>Cancel</button>

          {deleteAccount}
        </div>
      );
    } else if (this.props.isOwner) {
      return (
        <div className="author-edit-button">
          <button
            className="edit-button"
            onClick={this.openEdit}>Edit
          </button>
        </div>
      );
    }
  }
});

module.exports = AuthorEditable;

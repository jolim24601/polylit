var React = require('react'),
    AvatarEditable = require('./avatar_editable'),
    ApiUtil = require('../../util/api_util'),
    Follow = require('../buttons/follow');

var AuthorEditable = React.createClass({
  getInitialState: function () {
    return ({
      id: this.props.author.id,
      name: this.props.author.name,
      description: this.props.author.description,
      imageURL: '',
      imageFile: null,
      editable: false
    });
  },
  openEdit: function () {
    this.setState({ editable: true });
  },
  closeEdit: function () {
    this.setState({ editable: false });
  },
  resetEdit: function () {
    this.setState(this.getInitialState());
  },
  handleClick: function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append('author[avatar]', this.state.imageFile);
    formData.append('author[pen_name]', this.state.name);

    ApiUtil.editAuthor(formData, this.closeEdit);
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
  render: function () {
    var author = this.props.author;
    var buttons = this._getButtons();
    return (
      <div className="profile-banner">
        <div className="inner-profile group">
          <h3 contentEditable={this.state.editable}>{this.state.name}</h3>
          <p contentEditable={this.state.editable}>{this.state.description}</p>

          <div className="social-button-set group">
            <small>{author.following} Following</small>
            <small>{author.followers} Followers</small>
            <small>&middot;</small>
            <small><a href={author.twitter}>Twitter</a></small>
            <small><a href={author.facebook}>FB</a></small>
          </div>
          {buttons}

          <AvatarEditable imageURL={this.state.imageURL} handleUpload={this.handleUpload} />
        </div>
      </div>
    );
  },
  _getButtons: function () {
    if (this.state.editable && this.props.owner) {
      return (
        <div className="author-edit button">
          <button
            className="submit-button primary"
            onClick={this.handleClick}>Save
          </button>
          <button onClick={this.resetEdit}>Cancel</button>
        </div>
      );
    } else if (this.props.owner) {
      return (
        <button
          className="author-edit button"
          onClick={this.openEdit}>Edit
        </button>
        );
    }

    return <Follow />;
  }
});

module.exports = AuthorEditable;

var React = require('react'),
    AvatarEditable = require('./avatar_editable'),
    ApiUtil = require('../../util/api_util'),
    Follow = require('../buttons/follow');

var AuthorEditable = React.createClass({
  getInitialState: function () {
    return ({
      id: this.props.author.id,
      penName: this.props.author.name,
      description: this.props.author.description,
      imageFile: null,
      imageUrl: this.props.author.avatarUrl,
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
  handleSubmit: function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append('author[avatar]', this.state.imageFile);
    formData.append('author[pen_name]', this.state.penName);

    ApiUtil.editAuthor(formData, this.closeEdit);
  },
  handleUpload: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: reader.result });
    }.bind(this);

    if (file) {
      reader.readAsDataUrl(file);
    } else {
      this.setState({ imageFile: null, imageUrl: '' });
    }
  },
  render: function () {
    var author = this.props.author;
    var buttons = this.getButtons();
    return (
      <div contentEditable={this.state.editable} className="author-profile">
        <h3>{this.state.penName}</h3>
        <p>{this.state.description}</p>
        <small>{author.following} Following</small>
        <small>{author.followers} Followers</small>
        &middot;
        <a href="https://twitter.com/">Twitter</a>
        <a href="https://facebook.com/">FB</a>
        <img src={this.state.avatarUrl} alt={this.state.penName} />
        <AvatarEditable handleUpload={this.handleUpload} />

        {buttons}
      </div>
    );
  },
  getButtons: function () {
    if (this.state.editable && this.props.owner) {
      return (
        <div className="edit-mode-buttons">
          <button
            className="primary"
            onClick={this.handleSubmit}>Save
          </button>
          <button onClick={this.resetEdit}>Cancel</button>
        </div>
      );
    } else if (this.props.owner) {
      return <button onClick={this.openEdit}>Edit</button>;
    }

    return <Follow />;
  }
});

module.exports = AuthorEditable;

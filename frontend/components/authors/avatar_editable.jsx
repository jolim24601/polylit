var React = require('react');

var AvatarEditable = React.createClass({
  getFile: function () {
    if (this.props.editable) {
      document.getElementById('file-input').click();
    }
  },
  render: function () {
    var imageURL = this.props.imageURL || this.props.defaultURL;
    return (
      <div className="avatar floatRight">
        <img
          className="avatar-large"
          src={imageURL}
          onClick={this.getFile}
          alt="author avatar">
      </img>
      <input
        type="file" id="file-input"
        onChange={this.props.handleUpload}
        />
    </div>
    );
  }
});

module.exports = AvatarEditable;

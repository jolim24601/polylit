var React = require('react');

var AvatarEditable = React.createClass({
  getFile: function () {
    document.getElementById('file-input').click();
  },
  render: function () {
    return (
      <div className="avatar floatRight">
        <img
          className="avatar-large"
          src={this.props.imageURL}
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

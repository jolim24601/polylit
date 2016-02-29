var React = require('react'),
    FontAwesome = require('react-fontawesome');


var AvatarEditable = React.createClass({
  getInitialState: function () {
    return { clicked: false };
  },
  getFile: function () {
    if (this.props.editable) {
      this.setState({ clicked: true });
      document.getElementById('file-input').click();
    }
  },
  render: function () {
    var imageURL = this.props.imageURL || this.props.defaultURL;
    var iconOverlay;
    if (this.props.editable && !this.state.clicked) {
      iconOverlay = (
        <div onClick={this.getFile} className="camera-overlay">
          <FontAwesome
            className="camera-icon"
            name="fa fa-camera fa-3x"
            />
        </div>
      );
    }

    return (
      <div className="avatar float-right">
        <img
          className="avatar-large"
          src={imageURL}
          onClick={this.getFile}
          alt="author avatar">
      </img>
      {iconOverlay}
      <input
        type="file" id="file-input"
        onChange={this.props.handleUpload}
        />
    </div>
    );
  }
});

module.exports = AvatarEditable;

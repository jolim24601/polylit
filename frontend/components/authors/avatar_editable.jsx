var React = require('react');

var AvatarEditable = React.createClass({
  getInitialState: function () {
    return { imageFile: null, imageUrl: '' };
  },
  getFile: function () {
    document.getElementById('file-input').click();
  },
  render: function () {
    return (
      <button onClick={this.getFile} className="image-embed">
        Image
        <input
          type="file" id="file-input"
          onChange={this.props.handleUpload}
        />
      </button>
    );
  }
});

module.exports = AvatarEditable;

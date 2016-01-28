var React = require('react');

var inlineEmbed = React.createClass({
  render: function () {
    return (
      <button onClick={this.toggleTools} className="embed-tool">
        <div className="inline-tools">
          <button onClick={this.getFile} className="image-embed">
            Image
            <input type="file" id="file-input" onChange={this.handleUpload} />
          </button>
          <button className="video-embed">Video</button>
          <button className="article-embed">Content</button>
        </div>
      </button>
    );
  }
});

module.exports = inlineEmbed;

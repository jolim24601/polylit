var React = require('react');

var Tag = React.createClass({
  render: function () {
    var tag = this.props.tag;

    var tagToken;
    if (this.props.addTag) {
      tagToken = <li className="tag-list-item" onClick={this.props.addTag}>{tag.name}</li>;
    } else if (this.props.addFollow) {
      tagToken = <button onClick={this.props.addFollow} className="tag-token">{tag.name}</button>;
    } else if (this.props.deleteTag) {
      tagToken = (  <div className="tag-token">
                      <button className="tagging">{tag.name}</button>
                      <span onClick={this.props.deleteTag}>&times;</span>
                    </div>
                  );
    } else {

      tagToken = <a href={tag.url} className="tag-token">{tag.name}</a>;
    }

    return tagToken;
  }
});

module.exports = Tag;

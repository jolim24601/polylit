var React = require('react');

React.createClass({
  render: function () {
    var tag = this.props.tag;
    var tagToken;
    if (this.props.addTagging) {
      tagToken = <button onClick={this.props.addTagging} className="tag-token">{tag.name}</button>;
    } else if (this.props.addFollow) {
      tagToken = <button onClick={this.props.addFollow} className="tag-token">{tag.name}</button>;
    } else {
      tagToken = <a href={tag.link} className="tag-token">{tag.name}</a>;
    }

    return {tagToken};
  }
});

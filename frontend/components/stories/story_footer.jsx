var React = require('react'),
    IndexItemFooter = require('./index_item_footer'),
    Tag = require('../tags/tag');

var Footer = React.createClass({
  render: function () {
    var tags = this.props.tags.map(function (tag) {
      return <Tag key={tag.id} tag={tag} />;
    });

    return (
      <footer className="story-tags-footer group">

        <li className="footer-tags">
          {tags}
        </li>
        <li className="story-view-actions">
          <IndexItemFooter story={this.props.story} />
        </li>
      </footer>
    );
  }
});

module.exports = Footer;

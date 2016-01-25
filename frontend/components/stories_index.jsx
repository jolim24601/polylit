var React = require('react');

// used to display either bookmarks, favorites, or top stories
var StoriesIndex = React.createClass({
  render: function () {
    return (
      <div>
        <ol>
          <li>Top story</li>
          <li>Top story</li>
          <li>Top story</li>
        </ol>
      </div>
    );
  }
});

module.exports = StoriesIndex;

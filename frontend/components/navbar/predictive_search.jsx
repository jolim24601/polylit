var React = require('react');

var PredictiveSearch = React.createClass({
  render: function () {
    return (
      <input className="predictiveSearch" type="search" placeholder="Search Polylit" />
    );
  }
});

module.exports = PredictiveSearch;

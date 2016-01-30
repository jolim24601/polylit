var React = require('react');
var SearchResultsStore = require('../../stores/search_results_store');

var PredictiveSearch = React.createClass({
  render: function () {
    return (
      <div className="navbar-search">
        <input className="predictiveSearch" type="search" placeholder="Search Polylit" />
      </div>
    );
  }
});

module.exports = PredictiveSearch;

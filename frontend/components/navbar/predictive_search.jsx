var React = require('react'),
    SearchResultsStore = require('../../stores/search_results_store'),
    SearchApiUtil = require('../../util/search_api_util');

var hashHistory = require('react-router').hashHistory;

var PredictiveSearch = React.createClass({
  getInitialState: function () {
    return { query: '' };
  },
  componentDidMount: function () {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  search: function (e) {
    if (e.keyCode === 13) {
      hashHistory.push({
        pathname: 'search',
        query: {},
        state: this.state
      });
    } else {
      this.setState({ query: e.target.value });
      SearchApiUtil.search(e.target.value, "Predictive", 1);
    }
  },
  render: function () {
    return (
      <div className="navbar-search">
        <input
          className="predictiveSearch"
          type="search"
          placeholder="Search Polylit"
          onKeyUp={this.search}
          />
      </div>
    );
  },
  _onChange: function () {
    this.forceUpdate();
  }
});

module.exports = PredictiveSearch;

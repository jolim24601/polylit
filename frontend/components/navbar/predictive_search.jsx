var React = require('react'),
    SearchResultsStore = require('../../stores/search_results_store'),
    SearchApiUtil = require('../../util/search_api_util');

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
      debugger
      window.location.hash.replace('search');
      // {
      //   pathname: 'search',
      //   query: this.state,
      //   state: null
      // });
    } else {
      this.setState({ query: e.target.value });
      SearchApiUtil.search(e.target.value, 1, "Predictive");
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

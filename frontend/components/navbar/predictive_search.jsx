var React = require('react'),
    SearchResultsStore = require('../../stores/search_results_store'),
    SearchApiUtil = require('../../util/search_api_util'),
    History = require('react-router').History;

var FontAwesome = require('react-fontawesome');

var PredictiveSearch = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { query: '' };
  },
  componentDidMount: function () {
    window.addEventListener('resize', this._onChange, false);

    this.listener = SearchResultsStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onChange, false);
    this.listener.remove();
  },
  search: function (e) {
    if (e.keyCode === 13) {
      this.history.pushState(null, 'search', this.state);
    } else {
      this.setState({ query: e.target.value });
      SearchApiUtil.search(e.target.value, "Predictive", 1);
    }
  },
  handleClick: function () {
    this.history.pushState(null, 'search', this.state);
  },
  render: function () {
    if (window.innerWidth <= 912) {
      return (
        <a href="#/search" className="search-link">
          <FontAwesome
            className="search-icon"
            onClick={this.handleClick}
            name="fa fa-search" />
        </a>
      );
    }

    return (
      <div className="navbar-search">
        <FontAwesome
          className="search-icon"
          onClick={this.handleClick}
          name="fa fa-search" />
        <input
          className="predictive-search"
          type="search"
          placeholder="Search Polylit"
          onKeyUp={this.search}
          />
      </div>
    );
  },
  _onChange: function (_e) {
    this.forceUpdate();
  }
});

module.exports = PredictiveSearch;

var React = require('react'),
    SearchResultsStore = require('../../stores/search_results_store'),
    SearchApiUtil = require('../../util/search_api_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    StoryIndexItem = require('../stories/story_index_item'),
    InfiniteScroll = require('react-infinite-scroll')(React);

var Navbar = require('../navbar/navbar'),
    NavTools = require('../navbar/nav_tools');

var Search = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { query: '', page: 1, type: "Story" };
  },
  componentDidMount: function () {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  search: function () {
    SearchApiUtil.search(this.state.query, this.state.page, this.state.type);
  },
  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);
    this.setState({ page: nextPage });
  },
  render: function () {
    // add cases for tags, authors search
    var results = this.findByType();
    var pluralType = this.state.type === "Story" ? "Stories" : "People";

    return (
      <div className="main-content">
        <Navbar><NavTools /></Navbar>
        <ul onClick={this.changeType} className="search-type">
          <li className="darken-border"><a >Stories</a></li>
          <li><a>People</a></li>
        </ul>
        <input
          type="search"
          className="search-banner"
          placeholder="Search Polylit"
          valueLink={this.linkState('query') }
          onKeyUp={this.search}
          autoFocus
          />

        <ul className="search-feed">
          <li className="search-header">{pluralType}</li>
          {results}
        </ul>
      </div>
    );
  },
  findByType: function () {
    if (this.state.type === "Story") {
      return SearchResultsStore.stories().map(function (story) {
        return <StoryIndexItem key={story.id} story={story} />;
      });
    } else if (this.state.type === "Author") {
      return SearchResultsStore.authors().map(function (author) {
        return (
          <li key={author.id} className="author-search-card group">
            <img className="avatar-small floatLeft" src={author.avatar} alt={author.name} />
            <div className="bio floatLeft">
              <a href={author.url}>{author.name}</a>
              <p>{author.description}</p>
            </div>
            <button className="primary floatRight">Follow</button>
          </li>
        );
      });
    }
  },
  changeType: function (e) {
    var type = e.target.innerText === "People" ? "Author" : "Story";
    this.setState({ type: type });
    SearchApiUtil.search(this.state.query, this.state.page, type);
  },
  _onChange: function () {
    this.forceUpdate();
  }
});

module.exports = Search;

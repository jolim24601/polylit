var React = require('react'),
    SearchResultsStore = require('../../stores/search_results_store'),
    SearchApiUtil = require('../../util/search_api_util'),
    StoryIndexItem = require('../stories/story_index_item'),
    infiniteScroller = require('../../util/helpers').infiniteScroller;

var Navbar = require('../navbar/navbar'),
    NavTools = require('../navbar/nav_tools');

var Search = React.createClass({
  getInitialState: function () {
    return { query: '', page: 1, type: "Story" };
  },
  componentDidMount: function () {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
    // $(window).off('scroll', this.throttled);
  },
  componentWillReceiveProps: function (newProps) {
    var newQuery = newProps.location.query.query;
    this.setState({ query: newQuery });
    this.search(newQuery, this.state.type);
  },
  search: function (newQuery, newType) {
    SearchApiUtil.search(newQuery, newType, this.state.page);
    // this.throttled = infiniteScroller(this.nextPage);
  },
  nextPage: function () {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
      var nextPage = this.state.page + 1;
      this.setState({ page: nextPage });
      SearchApiUtil.search(this.state.query, this.state.type, nextPage);
    }
  },
  render: function () {
    // add cases for tags, authors search
    var results = this.findByType();
    var pluralType, storyActive, peopleActive, tagActive;
    if (this.state.type === "Story") {
      pluralType = "Stories";
      storyActive = "darken-border";
    } else if (this.state.type === "Author") {
      pluralType = "People";
      peopleActive = "darken-border";
    }

    return (
      <div className="main-content">
        <Navbar><NavTools /></Navbar>
        <ul onClick={this.changeType} className="search-type">
          <li className={storyActive}><a >Stories</a></li>
          <li className={peopleActive}><a>People</a></li>
        </ul>
        <input
          type="text"
          className="search-banner"
          placeholder="Search Polylit"
          value={this.state.query}
          onChange={this.handleChange}
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
  handleChange: function (e) {
    var newQuery = e.target.value;
    this.search(newQuery, this.state.type);
    this.setState({ query: newQuery });
  },
  changeType: function (e) {
    var newType = e.target.innerText === "People" ? "Author" : "Story";
    this.search(this.state.query, newType);
    this.setState({ type: newType });
  },
  _onChange: function () {
    this.forceUpdate();
  }
});

module.exports = Search;

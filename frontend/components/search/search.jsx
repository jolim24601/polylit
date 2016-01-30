var React = require('react'),
    SearchResultsStore = require('../../stores/search_results_store'),
    SearchApiUtil = require('../../util/search_api_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    StoryIndexItem = require('../stories/story_index_item'),
    Infinite = require('react-infinite');

var Navbar = require('../navbar/navbar'),
    NavTools = require('../navbar/nav_tools');

var Search = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { query: '', page: 1 };
  },
  componentDidMount: function () {
    this.listener = SearchResultsStore.addListener(this.forceUpdate);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  search: function () {
    SearchApiUtil.search(this.state.query, this.state.page);
  },
  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);
    // may have to throttle here with setTimeout / add spinner with isInfiniteLoading
    this.setState({ page: nextPage });
  },
  render: function () {
    // add cases for tags, authors search
    var results = SearchResultsStore.stories().map(function (story) {
      return <StoryIndexItem key={story.id} story={story} />;
    });
    var elementHeight = document.getElementsByClassName("story-feed-item").map(function (el) {
      return el.scrollHeight;
    });

    return (
      <div className="main-content">
        <Navbar><NavTools /></Navbar>
        <input
          type="search"
          className="search-bar"
          placeholder="Search Polylit"
          valueLink={this.linkstate('query') }
          onKeyUp={this.search}
        />

        <ul className="story-feed">
          <Infinite
            containerHeight={250}
            elementHeight={elementHeight}
            onInfiniteLoad={this.nextPage}
          >
            {results}
          </Infinite>
        </ul>
      </div>
    );
  }
});

module.exports = Search;

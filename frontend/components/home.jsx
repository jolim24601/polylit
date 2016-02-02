var React = require('react'),
    CurrentAuthorStore = require('../stores/current_author_store'),
    SessionApiUtil = require('../util/session_api_util');

var StoriesIndex = require('./stories/stories_index'),
    Sidebar = require('./sidebar/sidebar');

var Home = React.createClass({
  componentDidMount: function () {
    this.listener = CurrentAuthorStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentAuthor();
  },
  componentWillMount: function () {
    this.isFirstRender = true;
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  componentDidUpdate: function () {
    this.isFirstRender = false;
  },
  render: function () {
    if (!CurrentAuthorStore.currentAuthorFetched()) {
      return <div className="spinner">Loading...</div>;
    }

    var promo;
    if (!CurrentAuthorStore.isLoggedIn()
      && this.isFirstRender && this.props.location.pathname === "/") {
      promo = (
        <div className="promotron">
          <div className="inner-promotron">
            <div className="promo-content">
              <h2>Be Heard.</h2>
              <p>
                Polylit is for writers of all stripes to come and engage. There are no strangers here; Only friends you haven’t yet met.
              </p>
            </div>
            <img className="promotron"
              src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/promotron.png" />
          </div>
        </div>
      );
    }
    return (
      <div>
        {promo}
        <StoriesIndex tab="HOME"/>
      </div>
    );
  }
});

module.exports = Home;

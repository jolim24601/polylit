var React = require('react'),
    NProgress = require('nprogress'),
    CurrentAuthorStore = require('../stores/current_author_store'),
    SessionApiUtil = require('../util/session_api_util');

var App = React.createClass({
  componentWillMount: function () {
    this.isFirstRender = true;
    // loading bar animation
    NProgress.start();
  },
  componentDidMount: function () {
    this.listener = CurrentAuthorStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentAuthor();
    NProgress.done();
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
      <div className='main'>
        {promo}
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;

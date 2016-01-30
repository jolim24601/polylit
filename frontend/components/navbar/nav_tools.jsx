var React = require('react'),
    ProfileTools = require('./profile_tools'),
    PredictiveSearch = require('./predictive_search'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    SessionApiUtil = require('../../util/session_api_util');

var History = require('react-router');

var NavTools = React.createClass({
  getStateFromStore: function () {
    return { authenticated: CurrentAuthorStore.isLoggedIn() };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.authorListener = CurrentAuthorStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.authorListener.remove();
  },
  render: function () {
    var buttons;
    if (this.state.authenticated) {
      buttons = <ProfileTools />;
    } else {
      buttons = (
        <li id="nav-login" className="button primary">
          <a href="#/login">Sign In / Sign Up</a>
        </li>
      );
    }
    return (
      <ul className="navbar-tools group floatRight">
        <li><PredictiveSearch /></li>
        <li>
          <a onClick={this._ensureSignIn}
            className="write-link" href="#/new-story">Write a story</a>
        </li>

        {buttons}
      </ul>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  },
  _ensureSignIn: function () {
      if (CurrentAuthorStore.currentAuthorFetched()) {
        _redirectIfNotLoggedIn();
      } else {
        SessionApiUtil.fetchCurrentAuthor(_redirectIfNotLoggedIn);
      }
      function _redirectIfNotLoggedIn() {
        debugger
        if (!CurrentAuthorStore.isLoggedIn()) {
          History.push({}, '/');
        }
      }
    }
});

module.exports = NavTools;

var React = require('react'),
    Notifications = require('../buttons/notifications'),
    ProfileTools = require('./profile_tools'),
    PredictiveSearch = require('./predictive_search'),
    CurrentAuthorStore = require('../../stores/current_author_store');

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
    var buttons = this.props.tools;
    if (!buttons && this.state.authenticated) {
      buttons = <ProfileTools author={this.state} />;
    } else {
      buttons = (
        <li className="button primary">
          <a href="#/signup">Sign In / Sign Up</a>
        </li>
      );
    }
    return (
      <ul className="navbar-tools group floatRight">
        <li><PredictiveSearch /></li>
        <li><a href="#/new-story">Write a story</a></li>

        {buttons}
      </ul>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = NavTools;

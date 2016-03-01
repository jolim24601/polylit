var React = require('react'),
    ProfileTools = require('./profile_tools'),
    PredictiveSearch = require('./predictive_search'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    FontAwesome = require('react-fontawesome');


var NavTools = React.createClass({
  getStateFromStore: function () {
    return { authenticated: CurrentAuthorStore.isLoggedIn() };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.authorListener = CurrentAuthorStore.addListener(this._onChange);
    window.addEventListener('resize', this._onChange, false);
  },
  componentWillUnmount: function () {
    this.authorListener.remove();
    window.removeEventListener('resize', this._onChange, false);
  },
  render: function () {
    var buttons;
    if (this.state.authenticated) {
      buttons = <ProfileTools />;
    } else if (window.innerWidth <= 484) {
      buttons = (
        <li>
          <a href="#/auth">
            <FontAwesome id="login-icon" name="fa fa-sign-in" />
          </a>
        </li>
      );
    } else {
      buttons = (
        <li id="nav-login" className="button primary">
          <a href="#/auth">Sign In / Sign Up</a>
        </li>
      );
    }

    return (
      <ul className="navbar-tools group float-right">
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
  }
});

module.exports = NavTools;

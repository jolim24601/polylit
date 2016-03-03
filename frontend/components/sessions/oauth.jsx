var React = require('react'),
    SessionApiUtil = require('../../util/session_api_util'),
    History = require('react-router').History;

var FontAwesome = require('react-fontawesome');

var auth = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { loggingIn: false };
  },
  demoSignIn: function (e) {
    e.preventDefault();
    var demoCredentials = { email: 'leo@example.com', password: 'annakarenina123' };

    SessionApiUtil.loginAuthor(demoCredentials, function () {
      this.history.goBack();
    }.bind(this));
  },
  handleClick: function () {
    this.setState({ loggingIn: true });
  },
  render: function () {
    if (this.state.loggingIn) {
      return (
        <div className="spinner">
          <small className="loading">Signing In...</small>
        </div>
      );
    }

    return (
      <form className="oauth-form modal-form" onSubmit={this.handleSubmit}>
        <div className="logo" />

        <p className="modal-content">Sign In</p>

        <a href="/auth/twitter" onClick={this.handleClick} className="twitter-login oauth-login">
          <FontAwesome name="fa fa-twitter" />
          <span>Sign in with Twitter</span>
        </a>

        <a href="/auth/facebook" onClick={this.handleClick} className="fb-login oauth-login">
          <FontAwesome name="fa fa-facebook-official" />
          <span>Sign in with Facebook</span>
        </a>

        <div onClick={this.demoSignIn} className="demo-login oauth-login">
          <FontAwesome name="fa fa-user" />
          <a >Sign in as Leo Tolstoy</a>
        </div>

        <div className="auth-alts">
          <a href="#/signup">Sign up with email</a>
          <a href="#/login">I already have an account.</a>

          <a onClick={this.history.goBack}>Cancel</a>
        </div>
      </form>
    );
  }
});

module.exports = auth;

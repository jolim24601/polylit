var React = require('react'),
    SessionApiUtil = require('../../util/session_api_util'),
    History = require('react-router').History;

var FontAwesome = require('react-fontawesome');

var auth = React.createClass({
  mixins: [History],

  demoSignIn: function (e) {
    e.preventDefault();
    var demoCredentials = { email: 'leo@example.com', password: 'annakarenina123' };

    SessionApiUtil.loginAuthor(demoCredentials, function () {
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  handleSubmit: function (e) {
    e.preventDefault();
    SessionApiUtil.loginAuthor(this.state, function () {
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function () {
    return (
      <form className="oauth-form modal-form" onSubmit={this.handleSubmit}>
        <img className="modal-logo logo"
          src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/logo.png" alt="site logo"/>

        <p className="modal-content">Sign In</p>

        <div className="twitter-login oauth-login">
          <FontAwesome name="fa fa-twitter" />
          <a href="/auth/twitter">Sign in with Twitter</a>
        </div>

        <div className="fb-login oauth-login">
          <FontAwesome name="fa fa-facebook-official" />
          <a href="/auth/facebook">Sign in with Facebook</a>
        </div>

        <div className="demo-login oauth-login">
          <FontAwesome name="fa fa-user" />
          <a onClick={this.demoSignIn}>Sign in as Leo Tolstoy</a>
        </div>

        <div className="auth-alts">
          <a href="#/signup">Sign up with email</a>
          <a href="#/login">I already have an account.</a>

          <a href="#">Cancel</a>
        </div>
      </form>
    );
  }
});

module.exports = auth;

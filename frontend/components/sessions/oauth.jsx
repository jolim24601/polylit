var React = require('react'),
    SessionApiUtil = require('../../util/session_api_util'),
    History = require('react-router').History;


var auth = React.createClass({
  mixins: [History],

  demoSignIn: function (e) {
    e.preventDefault();
    var demoCredentials = { email: 'jolim24601@gmail.com', password: 'jupiter' };

    SessionApiUtil.loginAuthor(demoCredentials, function () {
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function () {
    return (
      <form className="modal-form" onSubmit={this.handleSubmit}>
        <img className="modal-logo logo"
          src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/logo.png" alt="site logo"/>

        <a href="/auth/twitter"></a>
        <a href="/auth/facebook"></a>

        <p className="modal-content">Sign In</p>

        <a href="#/login">I already have an account.</a>

        <button className="demo-login"
          onClick={this.demoSignIn}>Sign in as Demo user</button>

      </form>
    );
  }
});

module.exports = auth;

var React = require('react'),
    hashHistory = require('react-router').hashHistory,
    SessionApiUtil = require('../../util/session_api_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var newSession = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { email: '', password: '' };
  },
  demoSignIn: function (e) {
    e.preventDefault();
    var demoCredentials = { email: 'jolim24601@gmail.com', password: 'jupiter' };
    SessionApiUtil.loginAuthor(demoCredentials, function () {
      hashHistory.push('/');
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    SessionApiUtil.loginAuthor(this.state, function () {
      hashHistory.goBack();
    });
  },
  render: function () {
    return (
      <form className="modal-form" onSubmit={this.handleSubmit}>
        <img className="modal-logo logo"
          src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/logo.png" alt="site logo"/>

        <p className="modal-content">Create an account</p>

          <div className="input">
            <label htmlFor="form-email">Email</label>
            <input valueLink={this.linkState('email')} type="text"
              name="email" placeholder="yourname@example.com" />
          </div>

          <div className="input">
            <label htmlFor="form-password">Password</label>
            <input valueLink={this.linkState('password')} type="password"
              name="password" placeholder="Password" />
          </div>

          <div className="signin-button">
            <button className="primary">Sign In</button>
            <span className="button-alternative js-modal-close">
              <a href="#">Cancel</a>
            </span>
          </div>

          <button className="demo-login"
            onClick={this.demoSignIn}>Sign in as Demo user</button>
      </form>
    );
  }
});

module.exports = newSession;

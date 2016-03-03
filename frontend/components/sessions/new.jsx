var React = require('react'),
    History = require('react-router').History,
    SessionApiUtil = require('../../util/session_api_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var newSession = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { email: '', password: '' };
  },
  handleSubmit: function (e) {
    e.preventDefault();
    SessionApiUtil.loginAuthor(this.state, function () {
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function () {
    return (
      <form className="modal-form" onSubmit={this.handleSubmit}>
        <div className="logo" />

        <p className="modal-content">Sign In</p>

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
              <a onClick={this.history.goBack}>Cancel</a>
            </span>
          </div>
      </form>
    );
  }
});

module.exports = newSession;

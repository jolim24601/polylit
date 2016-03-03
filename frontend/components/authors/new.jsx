var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    SessionApiUtil = require('../../util/session_api_util'),
    History = require('react-router').History,
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var newAuthor = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return ({ email: '', name: '', password: '' });
  },
  handleSubmit: function (e) {
    e.preventDefault();

    ApiUtil.createAuthor(this.state, function () {
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function () {
    return (
      <form className="modal-form" onSubmit={this.handleSubmit}>
        <div className="logo" />

        <p className="modal-content">Create an account</p>

          <div className="input">
            <label htmlFor="form-email">Email</label>
            <input valueLink={this.linkState('email')} type="text"
              name="email" placeholder="yourname@example.com" />
          </div>

          <div className="input">
            <label htmlFor="form-email">Pen name</label>
            <input valueLink={this.linkState('name')} type="text"
              name="name" placeholder="Your name here" />
          </div>

          <div className="input">
            <label htmlFor="form-password">Password</label>
            <input valueLink={this.linkState('password')} type="password"
              name="password" placeholder="Password" />
          </div>

          <div className="signin-button">
            <button className="primary">Sign Up</button>
            <span className="button-alternative js-modal-close">
              <a onClick={this.history.goBack}>Cancel</a>
            </span>
          </div>
      </form>
    );
  }
});

module.exports = newAuthor;

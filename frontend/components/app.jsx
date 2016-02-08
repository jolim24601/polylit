var React = require('react'),
    CurrentAuthorStore = require('../stores/current_author_store'),
    FlashActions = require('../actions/flash_actions'),
    FlashStore = require('../stores/flash_store'),
    NProgress = require('nprogress'),
    SessionApiUtil = require('../util/session_api_util');

var App = React.createClass({
  componentWillMount: function () {
    // loading bar animation
    NProgress.start();
  },
  componentDidMount: function () {
    this.flashListener = FlashStore.addListener(this.forceUpdate.bind(this));
    this.listener = CurrentAuthorStore.addListener(this.forceUpdate.bind(this));
    NProgress.done();
  },
  componentWillUnmount: function () {
    this.flashListener.remove();
    this.listener.remove();
  },
  componentWillReceiveProps: function () {
    // reset flash to empty
    FlashActions.updateFlash({});
  },
  render: function () {
    var flashBar, errors = [];
    FlashStore.all().map(function (message) {
      errors.push(<li key={message}>{message}</li>);
    });

    if (errors.length > 0) { flashBar = <ul className="errorBar">{errors}</ul>; }

    if (!CurrentAuthorStore.currentAuthorFetched()) {
      return (
        <div className="spinner">
          <small className="loading">Loading...</small>
        </div>
      );
    }

    return (
      <div className='main'>
        {this.props.children}
        {flashBar}
      </div>
    );
  }
});

module.exports = App;

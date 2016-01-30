var React = require('react'),
    NProgress = require('nprogress'),
    CurrentAuthorStore = require('../stores/current_author_store'),
    SessionApiUtil = require('../util/session_api_util');

var App = React.createClass({
  componentWillMount: function () {
    // loading bar animation
    NProgress.start();
  },
  componentDidMount: function () {
    this.listener = CurrentAuthorStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentAuthor();
    NProgress.done();
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  render: function () {
    if (!CurrentAuthorStore.currentAuthorFetched()) {
      return <div className="spinner">Loading..</div>;
    }

    return (
      <div className='main'>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;

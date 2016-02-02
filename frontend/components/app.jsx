var React = require('react'),
    NProgress = require('nprogress');


var App = React.createClass({
  componentWillMount: function () {
    // loading bar animation
    NProgress.start();
  },
  componentDidMount: function () {
    NProgress.done();
  },
  render: function () {
    return (
      <div className='main'>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;

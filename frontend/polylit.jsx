var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;

var StoryForm = require('./components/story_form');
var NProgress = require('nprogress');

var App = React.createClass({
  componentWillMount: function () {
    NProgress.start();
  },
  render: function () {
    return (
      <div className='main'>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={App}>
    <Route path='/stories/new' component={StoryForm}/>
  </Route>
);


document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('content'));
  NProgress.done();
});

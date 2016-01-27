var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    NProgress = require('nprogress'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,
    WriteTools = require('./write_tools'),
    NavTools = require('./nav_tools'),
    StoryForm = require('./components/stories/story_form'),
    Navbar = require('./components/navbar/navbar');

var App = React.createClass({
  componentWillMount: function () {
    // loading bar animation
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
    <IndexRoute component={Navbar} />
    <IndexRoute component={NavTools} />
    <Route path='new-story' component={StoryForm} />
      <IndexRoute component={Navbar} />
      <IndexRoute component={WriteTools} />
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('content')
  );
  // complete animation
  NProgress.done();
});

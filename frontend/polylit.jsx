var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    NProgress = require('nprogress'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,
    StoriesIndex = require('./components/stories/stories_index'),
    StoryForm = require('./components/stories/story_form'),
    Navbar = require('./components/navbar/navbar'),
    NavTools = require('./components/navbar/nav_tools'),
    WriteTools = require('./components/navbar/write_tools');

var App = React.createClass({
  componentWillMount: function () {
    // loading bar animation
    NProgress.start();
  },

  render: function () {
    var navbar = (<Navbar><NavTools /></Navbar>);
    if (this.props.children && this.props.children.type.displayName === 'StoryForm') {
      navbar = (<Navbar><WriteTools /></Navbar>);
    }
    return (
      <div className='main'>
        {navbar}
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={App}>
    <Route path='new-story' component={StoryForm} />
    <Route path='stories' component={StoriesIndex}>
    </Route>
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

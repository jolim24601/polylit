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
    WriteTools = require('./components/navbar/write_tools'),
    AuthorProfile = require('./components/authors/author_profile');

var App = React.createClass({
  componentWillMount: function () {
    // loading bar animation
    NProgress.start();
  },

  render: function () {
    var tools = <NavTools />;
    if (this.props.children && this.props.children.type.displayName === 'StoryForm') {
      tools = <WriteTools />;
    }
    return (
      <div className='main'>
        <Navbar>{tools}</Navbar>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={App}>
    <Route path='new-story' component={StoryForm} />
    <Route path='stories' component={StoriesIndex} />
    <Route path='api/authors/:id' component={AuthorProfile} />
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

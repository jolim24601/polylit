var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    DefaultRoute = ReactRouter.DefaultRoute,
    hashHistory = ReactRouter.hashHistory,
    StoriesIndex = require('./components/stories/stories_index'),
    StoryForm = require('./components/stories/story_form'),
    StoryView = require('./components/stories/story_view'),
    AuthorProfile = require('./components/authors/author_profile'),
    newSession = require('./components/sessions/new'),
    newAuthor = require('./components/authors/new');

var App = require('./components/app');

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={StoriesIndex} />
    <Route path='login' component={newSession} />
    <Route path='signup' component={newAuthor} />
    <Route path='new-story' component={StoryForm} />
    <Route path='stories' component={StoriesIndex} />
    <Route path='stories/:id' component={StoryView} />
    <Route path='authors/:id' component={AuthorProfile} />
  </Route>
);

Navbar = require('./navbar/navbar'),
HomeTools = require('./home_tools'),
WriteTools = require('./write_tools'),
NavTools = require('./nav_tools'); // profile
<Navbar><HomeTools /><NavTools /></Navbar>
<Navbar><WriteTools /></Navbar>
<Navbar><NavTools /></Navbar>

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('content')
  );
});

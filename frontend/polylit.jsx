var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
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

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('content')
  );
});

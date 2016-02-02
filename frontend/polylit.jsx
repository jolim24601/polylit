var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    History = ReactRouter.History,
    StoriesIndex = require('./components/stories/stories_index'),
    StoryForm = require('./components/stories/story_form'),
    StoryView = require('./components/stories/story_view'),
    AuthorProfile = require('./components/authors/author_profile'),
    newSession = require('./components/sessions/new'),
    newAuthor = require('./components/authors/new'),
    SessionApiUtil = require('./util/session_api_util'),
    CurrentAuthorStore = require('./stores/current_author_store'),
    AuthorStories = require('./components/authors/stories'),
    Search = require('./components/search/search');

var App = require('./components/app');

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={StoriesIndex} />
    <Route path='login' component={newSession} />
    <Route path='signup' component={newAuthor} />
    <Route path='new-story' onEnter={_ensureSignIn} component={StoryForm} />
    <Route path='stories' component={StoriesIndex} />
    <Route path='stories/:id' component={StoryView}>
      <Route path='edit' component={StoryView} />
    </Route>
    <Route path='authors/:id' component={AuthorProfile} />
    <Route path='me/stories' component={AuthorStories} />
    <Route path='search' component={Search} />
  </Route>
);

function _ensureSignIn(nextState, replace) {
  if (CurrentAuthorStore.currentAuthorFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentAuthor(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentAuthorStore.isLoggedIn()) {
      replace('/login');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('content')
  );
});

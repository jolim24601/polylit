var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    History = ReactRouter.History,
    StoriesIndex = require('./components/stories/stories_index'),
    TaggedStoriesIndex = require('./components/stories/tagged_stories'),
    BookmarksIndex = require('./components/stories/bookmarked_stories'),
    StoryForm = require('./components/stories/story_form'),
    StoryView = require('./components/stories/story_view'),
    AuthorProfile = require('./components/authors/author_profile'),
    newSession = require('./components/sessions/new'),
    newAuthor = require('./components/authors/new'),
    oauth = require('./components/sessions/oauth'),
    SessionApiUtil = require('./util/session_api_util'),
    CurrentAuthorStore = require('./stores/current_author_store'),
    AuthorStories = require('./components/authors/stories'),
    Search = require('./components/search/search');

var App = require('./components/app');
var Home = require('./components/home');

var routes = (
  <Route onEnter={SessionApiUtil.fetchCurrentAuthor} path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='auth' component={oauth} />
    <Route path='login' component={newSession} />
    <Route path='signup' component={newAuthor} />
    <Route path='stories/:id' component={StoryView} />
    <Route path='authors/:id' component={AuthorProfile} />
    <Route path='top-stories' component={StoriesIndex} />
    <Route path='search' component={Search} />
    <Route path='tag/:name' component={TaggedStoriesIndex} />
    <Route path='me/stories' onEnter={_ensureSignIn} component={AuthorStories} />
    <Route path='me/bookmarks' onEnter={_ensureSignIn} component={BookmarksIndex} />
    <Route path='stories/:id/edit' onEnter={_ensureSignIn} component={StoryForm} />
    <Route path='new-story' onEnter={_ensureSignIn} component={StoryForm} />
  </Route>
);

function _ensureSignIn(nextState, replace, callback) {
  if (CurrentAuthorStore.currentAuthorFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentAuthor(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentAuthorStore.isLoggedIn()) {
      replace(null, '/auth', {});
    }
    callback();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('content')
  );
});

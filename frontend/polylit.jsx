var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,
    StoriesIndex = require('./components/stories_index'),
    StoryForm = require('./components/story_form'),
    NProgress = require('nprogress');

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

// comments are tbd
var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={StoriesIndex}/>
    <Route path='new-story' component={StoryForm}/>
  </Route>
);

// <Route path='new-publication' component={PublicationForm}/>
// <Route path='authors/:authorId' component={AuthorView}>
// <Route path='/:storyId' component={StoryView}/>
// </Route>
// <Route path='publications/:publicationId' component={PublicationView}>
// <Route path='/:storyId' component={StoryView}/>
// </Route>

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('content')
  );
  NProgress.done();
});

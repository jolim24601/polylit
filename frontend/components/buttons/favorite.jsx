var React = require('react'),
    FontAwesome = require('react-fontawesome'),
    ApiUtil = require('../../util/api_util'),
    ApiActions = require('../../actions/api_actions'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var History = require('react-router').History;

var Favorite = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    if (!CurrentAuthorStore.isLoggedIn()) { 
      return { favorited: false };
    }

    var story = StoryStore.find(this.props.story.id) || this.props.story;
    var favorites = CurrentAuthorStore.currentAuthor().favorites;
    var storyIds = favorites.map(function (favorite) {
      return favorite.story_id;
    });

    if (storyIds.indexOf(story.id) !== -1) {
      return { favorited: true };
    }
    return { favorited: false };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.listener = CurrentAuthorStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  favoriteStory: function () {
    if (!CurrentAuthorStore.isLoggedIn()) {
      this.history.pushState(null, 'auth', {});
    }

    var story = this.props.story;
    var type; 
    if (this.state.favorited) {
      type = "DELETE";
      story.favoritesCount -= 1;
    } else {
      type = "POST";
      story.favoritesCount += 1;
    }


    ApiUtil.toggleFavorite({
      favorite: {
        story_id: story.id,
        author_id: CurrentAuthorStore.currentAuthor().id
      },
      type: type
    }, function () {
      ApiActions.updateStoryFavorites(story);
    });

  },
  render: function () {
    var name = this.state.favorited? "fa fa-heart" : "fa fa-heart-o";

    return (
      <small>
        <FontAwesome
          onClick={this.favoriteStory}
          className="favorite-button floatLeft"
          name={name}
          />
      </small>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = Favorite;

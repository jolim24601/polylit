var React = require('react'),
    FontAwesome = require('react-fontawesome'),
    ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var History = require('react-router').History;

var Favorite = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var story = StoryStore.find(this.props.story.id) || this.props.story;

    var authorIds = story.favorites.map(function (fav) {
      return fav.author_id;
    });
    if (authorIds.indexOf(CurrentAuthorStore.currentAuthor().id) !== -1) {
      return { favorited: true };
    }
    return { favorited: false };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.listener = StoryStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  favoriteStory: function () {
    if (!CurrentAuthorStore.isLoggedIn()) {
      this.history.pushState(null, 'auth', {});
    }

    var type = this.state.favorited ? "DELETE" : "POST";

    ApiUtil.toggleFavorite({
      favorite: {
        story_id: this.props.story.id,
        author_id: CurrentAuthorStore.currentAuthor().id
      },
      type: type
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

var React = require('react');
var FontAwesome = require('react-fontawesome');

var ApiUtil = require('../../util/api_util'),
    StoryStore = require('../../stores/story_store'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var Favorite = React.createClass({
  getStateFromStore: function () {
    var favorites = StoryStore.find(this.props.storyId).favorites;
    var authorIds = favorites.map(function (fav) {
      return fav.author_id;
    });
    if (authorIds.indexOf(CurrentAuthorStore.currentAuthor().id) !== -1) {
      return { favorited: true};
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
    var type = this.state.favorited ? "DELETE" : "POST";

    ApiUtil.toggleFavorite({
      favorite: {
        story_id: this.props.storyId,
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

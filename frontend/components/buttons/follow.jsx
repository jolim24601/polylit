var React = require('react'),
    AuthorStore = require('../../stores/author_store'),
    AuthorActions = require('../../actions/author_actions'),
    TagActions = require('../../actions/tag_actions'),
    TagStore = require('../../stores/tag_store'),
    CurrentAuthorActions = require('../../actions/current_author_actions'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    FollowApiUtil = require('../../util/follow_api_util');

var Follow = React.createClass({
  getStateFromStore: function () {
    var author = CurrentAuthorStore.currentAuthor();
    var followerIds = this.props.followable.follows.map(function (f) {
      return f.follower_id;
    });
    if (followerIds.indexOf(author.id) !== -1) {
      return { message: "Following" };
    }
    return { message: "Follow" };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  componentDidMount: function () {
    this.authorListener = AuthorStore.addListener(this._onChange);
    this.tagListener = TagStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.authorListener.remove();
    this.tagListener.remove();
  },
  toggleFollow: function () {
    var data = {
      followable_type: this.props.followable._type,
      followable_id: this.props.followable.id,
      follower_id: CurrentAuthorStore.currentAuthor().id,
      type: ""
    };
    if (this.state.message === "Following") {
      data.type = "DELETE";
    } else {
      data.type = "POST";
    }
    // Current Author gets updated
    FollowApiUtil.toggleFollow(data, function(follow) {
      if (follow.followable_type === "Author") {
        AuthorActions.updateFollow(follow);
      } else if (follow.followable_type === "Tag") {
        TagActions.updateFollow(follow);
      }
      CurrentAuthorActions.updateFollow(follow);
    });
  },
  render: function () {
    if (CurrentAuthorStore.currentAuthor().id === this.props.followable.id
      && this.props.followable._type === "Author") {

      return null;
    }

    return (
      <button
        onClick={this.toggleFollow}
        className={this.state.message + " primary"}
        >
      {this.state.message}
      </button>
    );
  },
  _onChange: function () {
    this.setState(this.getStateFromStore());
  }
});

module.exports = Follow;

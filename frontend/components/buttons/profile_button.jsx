var React = require('react'),
    SessionApiUtil = require('../../util/session_api_util'),
    CurrentAuthorActions = require('../../actions/current_author_actions'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    History = require('react-router').History;

var ProfileButton = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { active: false };
  },
  toggleView: function () {
    this.setState({ active: !this.state.active });
  },
  clickHandler: function (e) {
    if (!$(e.target).closest('#navatar').length) {
      this.toggleView();
    }
  },
  componentDidMount: function () {
    this.listener = CurrentAuthorStore.addListener(this._onChange);
  },
  componentDidUpdate: function () {
    if (this.state.active) {
      $(document).on('click', this.clickHandler);
    } else {
      $(document).off('click', this.clickHandler);
    }
  },
  componentWillUnmount: function () {
    this.listener.remove();
    $(document).off('click', this.clickHandler);
  },
  logoutAuthor: function () {
    SessionApiUtil.logoutAuthor(function () {
      CurrentAuthorActions.destroyCurrentAuthor();
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function () {
    var author = CurrentAuthorStore.currentAuthor();
    var authorLink = "#/authors/" + author.id;
    var profileClass =
      this.state.active ? "profile-actions tooltip" : "profile-actions tooltip hide";

    return (
      <div className="navbar-profile">
        <img id="navatar"
             onClick={this.toggleView}
             className="avatar-small"
             src={author.avatar}
             alt={author.name}
             />
        <ul className={profileClass}>
         <li key={"prof-new-story"}><a href="#/new-story">New Story</a></li>
         <li key={"prof-drafts"}><a href="#/me/stories">Drafts and stories</a></li>
         <li key={"prof-link"}><a href={authorLink}>Profile</a></li>
         <li onClick={this.logoutAuthor} key={"prof-signout"}><a>Sign Out</a></li>
        </ul>
      </div>
    );
  },
  _onChange: function () {
    this.forceUpdate();
  }
});

module.exports = ProfileButton;

var React = require('react'),
    SessionApiUtil = require('../../util/session_api_util'),
    CurrentAuthorStore = require('../../stores/current_author_store');

var ProfileButton = React.createClass({
  getInitialState: function () {
    return { active: false };
  },
  toggleView: function () {
    this.setState({ active: !this.state.active });
  },
  clickHandler: function (e) {
    // get this to work when pressing the parent element.
    if ($(e.target).parents('.profile-actions').length === 0) {
      this.toggleView();
    }
  },
  componentDidUpdate: function () {
    if (this.state.active) {
      $('body').on('click', this.clickHandler);
    } else {
      $('body').off('click', this.clickHandler);
    }
  },
  logoutAuthor: function () {
    SessionApiUtil.logoutAuthor();
  },
  render: function () {
    var author = CurrentAuthorStore.currentAuthor();
    var authorLink = "#/authors/" + author.id;
    var profileClass =
      this.state.active ? "profile-actions tooltip" : "profile-actions tooltip hide";

    return (
      <div onClick={this.toggleView} className="navbar-profile">
        <img className="avatar-small" src={author.avatar} alt={author.name} />
        <ul className={ profileClass }>
         <li key={"prof-new-story"}><a href="#/new-story">New Story</a></li>
         <li key={"prof-drafts"}><a href="#">Drafts and stories</a></li>
         <li key={"prof-publications"}><a href="#">Publications</a></li>
         <li key={"prof-link"}><a href={authorLink}>Profile</a></li>
         <li onClick={this.logoutAuthor} key={"prof-signout"}><a href="#">Sign Out</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = ProfileButton;

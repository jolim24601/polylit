var React = require('react'),
    ApiUtil = require('../../util/api_util');

var ProfileButton = React.createClass({
  getInitialState: function () {
    return { active: false };
  },
  toggleView: function () {
    this.setState({ active: !this.state.active });
  },
  clickHandler: function (e) {
    if ($(e.target).parents('.profile-actions').length === 0) {
      this.toggleView();
    } else if ($(e.target).is('.profile-actions')) {
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
  destroySession: function () {
    ApiUtil.destroySession();
  },
  render: function () {
    var profileClass =
      this.state.active ? "profile-actions" : "profile-actions hide";

    return (
      <div onClick={this.toggleView} className="navbar-profile">
        Profile
        <ul className={ profileClass }>
         <div className="tooltip"></div>
         <li key={"prof-new-story"}><a href="#">New Story</a></li>
         <li key={"prof-drafts"}><a href="#">Drafts and stories</a></li>
         <li key={"prof-publications"}><a href="#">Publications</a></li>
         <li onClick={this.destroySession} key={"prof-signout"}><a href="#">Sign Out</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = ProfileButton;

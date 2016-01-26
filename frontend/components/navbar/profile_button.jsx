var React = require('react');

var ProfileButton = React.createClass({
  getInitialState: function () {
    return { active: false };
  },
  toggleView: function () {
    this.setState({ active: !this.state.active });
  },
  render: function () {
    var profileClass;
    if (this.state.active) {
      profileClass = "profile-actions";
    } else {
      profileClass = "profile-actions hide";
    }

    return (
      <li onClick={this.toggleView} className="metabar-profile">
        <ul className={ profileClass }>
         <li key={"prof-new-story"}><a href="#">New Story</a></li>
         <li key={"prof-drafts"}><a href="#">Drafts and stories</a></li>
         <li key={"prof-publications"}><a href="#">Publications</a></li>
         <li key={"prof-signout"}><a href="#">Sign Out</a></li>
        </ul>
      </li>
    );
  }
});

module.exports = ProfileButton;

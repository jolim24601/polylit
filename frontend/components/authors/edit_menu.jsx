var React = require('react'),
    CurrentAuthorActions = require('../../actions/current_author_actions'),
    ApiUtil = require('../../util/api_util');


var EditMenu = React.createClass({
  getInitialState: function () {
    return { active: false };
  },
  destroyStory: function () {
    ApiUtil.destroyStory(this.props.story,
      CurrentAuthorActions.loseStory(this.props.story));
  },
  toggleView: function () {
    this.setState({ active: !this.state.active });
  },
  render: function () {
    var editActions;
    if (this.state.active) {
      editActions = "edit-actions";
    } else {
      editActions = "edit-actions hide";
    }

    return (
      <span onClick={this.toggleView} className="edit-option">
        &or;
        <ul onMouseLeave={this.toggleView} className={editActions}>
          <li><a href={this.props.story.url}>Edit</a></li>
          <li><button onClick={this.destroyStory}>Delete</button></li>
        </ul>
      </span>
    );
  }
});

module.exports = EditMenu;

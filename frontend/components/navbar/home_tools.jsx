var React = require('react'),
    objectAssign = require('object-assign');

var blankState = { tabActive1: "", tabActive2: "", tabActive3: "" };

var HomeTools = React.createClass({
  getInitialState: function () {
    return objectAssign({}, blankState, { tabActive1: "is-active" });
  },
  componentWillReceiveProps: function (newProps) {
    var path = newProps.location.pathname;
    var newState;
    if (path === '/top-stories') {
      newState = objectAssign({}, blankState, { tabActive2: "is-active" });
    } else if (path === '/') {
      newState = this.getInitialState();
    } else {
      newState = objectAssign({}, blankState, { tabActive3: "is-active" });
    }
    this.setState(newState);
  },
  render: function () {
    return (
      <ul className="navbar-center group floatLeft">
        <li className={this.state.tabActive1}>
          <a href="#">HOME</a>
        </li>
        <li className={this.state.tabActive2}>
          <a href="#/top-stories">TOP STORIES</a>
        </li>
        <li className={this.state.tabActive3}>
          <a href="#">BOOKMARKS</a>
        </li>
      </ul>
    );
  }
});

module.exports = HomeTools;

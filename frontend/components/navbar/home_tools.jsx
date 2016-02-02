var React = require('react'),
    objectAssign = require('object-assign'),
    History = require('react-router').History;

var blankState = { tabActive1: "", tabActive2: "", tabActive3: "" };

var HomeTools = React.createClass({
  getInitialState: function () {
    return objectAssign({}, blankState, { tabActive1: "is-active" });
  },
  handleClick: function (e) {
    var newState;
    if (e.target.innerHTML === "HOME") {
      newState = this.getInitialState();
    } else if (e.target.innerHTML === "TOP STORIES") {
      newState = objectAssign({}, blankState, { tabActive2: "is-active" });
    } else {
      newState = objectAssign({}, blankState, { tabActive3: "is-active" });
    }

    this.setState(newState);
  },
  render: function () {
    return (
      <ul className="navbar-center group floatLeft">
        <li className={this.state.tabActive1}>
          <a onClick={this.handleClick} href="#">HOME</a>
        </li>
        <li>
          <a onClick={this.handleClick} href="#/top-stories">TOP STORIES</a>
        </li>
        <li className={this.state.tabActive3}>
          <a onClick={this.handleClick} href="#">BOOKMARKS</a>
        </li>
      </ul>
    );
  }
});

module.exports = HomeTools;

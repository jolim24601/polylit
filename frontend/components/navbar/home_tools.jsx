var React = require('react');

var HomeTools = React.createClass({
  getInitialState: function () {
    return ({ tabActive1: "is-active", tabActive2: "", tabActive3: "" });
  },
  render: function () {
    return (
      <ul className="navbar-center group floatLeft">
        <li className={this.state.tabActive1}><a href="#">HOME</a></li>
        <li className={this.state.tabActive2}><a href="#/top-stories">TOP STORIES</a></li>
        <li className={this.state.tabActive3}><a href="#">BOOKMARKS</a></li>
      </ul>
    );
  }
});

module.exports = HomeTools;

var React = require('react'),
    objectAssign = require('object-assign'),
    CurrentAuthorStore = require('../../stores/current_author_store'),
    History = require('react-router').History;

var blankState = { 
  tabActive1: "", 
  tabActive2: "", 
  tabActive3: ""
};

var HomeTools = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return objectAssign({}, blankState);
  },
  componentDidMount: function () {
    window.addEventListener('resize', this._onChange, false);
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onChange, false);
  },
  componentWillReceiveProps: function (newProps) {
    var path = newProps.location.pathname;

    var newState;
    if (path === '/') {
      newState = objectAssign({}, blankState, { 
        tabActive1: "is-active",
        optionsState: path 
      });
    } else if (path === '/top-stories') {
      newState = objectAssign({}, blankState, { 
        tabActive2: "is-active",
        optionsState: path 
      });
    } else {
      newState = objectAssign({}, blankState, {
        tabActive3: "is-active",
        optionsState: path 
      });
    }

    this.setState(newState);
  },
  handleChange: function (e) {
    this.history.pushState(null, e.target.value, {});
  },
  render: function () {
    if (window.innerWidth <= 484 
        || (!CurrentAuthorStore.isLoggedIn() && window.innerWidth <= 643)) {
      return (
        <select value={this.state.optionsState}
                onChange={this.handleChange}
                className="navbar-dropdown group floatLeft">

          <option value="/">HOME</option>
          <option value="/top-stories">TOP STORIES</option>
          <option value="/me/bookmarks">BOOKMARKS</option>
        </select>
      );      
    }

    return (
      <ul className="navbar-center group floatLeft">
        <li className={this.state.tabActive1}>
          <a href="#">HOME</a>
        </li>
        <li className={this.state.tabActive2}>
          <a href="#/top-stories">TOP STORIES</a>
        </li>
        <li className={this.state.tabActive3}>
          <a href="#/me/bookmarks">BOOKMARKS</a>
        </li>
      </ul>
    );
  },
  _onChange: function (_e) {
    this.forceUpdate();
  }
});

module.exports = HomeTools;

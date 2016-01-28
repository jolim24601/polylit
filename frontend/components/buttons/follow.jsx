var React = require('react');

var Follow = React.createClass({
  getStateFromStore: function () {
    // should check for user in author's followers
    return { follow: "Follow" };
  },
  getInitialState: function () {
    return this.getStateFromStore();
  },
  render: function () {
    return (
      <button className="author-follow">{this.state.follow}</button>
    );
  }
});

module.exports = Follow;

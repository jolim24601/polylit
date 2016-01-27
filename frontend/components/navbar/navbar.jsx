var React = require('react');

var Navbar = React.createClass({
  render: function () {
    return (
      <header className="navbar">
        <nav className="navbar-nav group">
          <div className="navbar-logo">
            <h2 className="logo floatLeft"><a href="/">Polylit</a></h2>
          </div>

          <ul className="navbar-center group floatLeft">
            <li><a href="/">HOME</a></li>
            <li><a href="#/stories">TOP STORIES</a></li>
            <li><a href="#">BOOKMARKS</a></li>
          </ul>

          {this.props.children}
        </nav>
      </header>
    );
  }
});

module.exports = Navbar;

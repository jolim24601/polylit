var React = require('react');

var Navbar = React.createClass({
  render: function () {
    return (
      <header className="navbar">
        <nav className="navbar-nav group">
          <div className="navbar-logo floatLeft">
            <img src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/logo.png" className="logo" alt="site-logo" />
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

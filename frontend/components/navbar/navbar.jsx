var React = require('react');

var Navbar = React.createClass({
  render: function () {
    return (
      <header className="navbar">
        <nav className="navbar-nav group">
          <a href="/" className="navbar-logo floatLeft">
            <img className="logo" alt="site-logo" onClick={this.redirect}
              src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/logo.png" />
          </a>

          {this.props.children}
        </nav>
      </header>
    );
  }
});

module.exports = Navbar;

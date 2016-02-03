var React = require('react');

var navbarHeight = $('header').outerHeight();
var delta = 5;

var Navbar = React.createClass({
  getInitialState: function () {
    return ({
      didScroll: false,
      lastScrollTop: 0
     });
  },
  componentDidMount: function () {
    this.scrollerId = $(window).scroll(function(event) {
      this.setState({ didScroll: true });
    }.bind(this));

    this.intervalId = setInterval(function() {
      if (this.state.didScroll) {
        this.hasScrolled();
        this.setState({ didScroll: false });
      }
    }.bind(this), 250);
  },
  componentWillUnmount: function () {
    $(window).off('scroll', this.scrollerId);
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
  hasScrolled: function () {
    var st = $(document).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(this.state.lastScrollTop - st) <= delta) { return; }

    if (st > this.state.lastScrollTop && st > navbarHeight) {
      $('.navbar').addClass('nav-up');
      $('.sidebar').addClass('side-up');
    } else if (st + $(window).height() < $(document).height()) {
      $('.navbar').removeClass('nav-up');
      $('.sidebar').removeClass('side-up');
    }

    this.setState({ lastScrollTop: st });
  },
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

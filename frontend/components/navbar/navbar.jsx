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
    this.slideSidebar();

    $(window).scroll(this.scrollHandler);
    this.intervalId = setInterval(function() {
      if (this.state.didScroll) {
        this.hasScrolled();
        this.setState({ didScroll: false });
      }
    }.bind(this), 250);
  },
  scrollHandler: function (e) {
    this.setState({ didScroll: true });
  },
  componentWillUnmount: function () {
    $(window).off('scroll', this.scrollHandler);
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

    this.slideSidebar();

    this.setState({ lastScrollTop: st });
  },
  slideSidebar: function () {
    var st = $(document).scrollTop();
    if (document.querySelector('.promotron') && st < $('.promotron').outerHeight()) {
      $('.sidebar').addClass('side-right');
    } else {
      $('.sidebar').removeClass('hide');
      $('.sidebar').removeClass('side-right');
    }
  },
  render: function () {
    return (
      <header className="navbar">
        <nav className="navbar-nav group">
          <a href="#" className="navbar-logo floatLeft">
            <img className="logo" alt="site-logo"
              src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/logo.png" />
          </a>

          {this.props.children}
        </nav>
      </header>
    );
  }
});

module.exports = Navbar;

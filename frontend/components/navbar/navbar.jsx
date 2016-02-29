var React = require('react');

var Navbar = React.createClass({
  getInitialState: function () {
    return ({
      didScroll: false,
      lastScrollTop: 0
     });
  },
  componentDidMount: function () {
    this.slideSidebar();

    window.addEventListener('scroll', this.scrollHandler);
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
    window.removeEventListener('scroll', this.scrollHandler);
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
  hasScrolled: function () {
    var st = document.body.scrollTop;
    // Make sure they scroll more than delta
    if (Math.abs(this.state.lastScrollTop - st) <= 5) { return; }

    var sb =  document.querySelector('.sidebar');
    var nb = document.querySelector('.navbar');
    var nbHeight = nb.offsetHeight;

    // if they scrolled and scrolled out of view of the header
    if (st > this.state.lastScrollTop && st > nbHeight) {
      nb.classList.add('nav-up');
      sb.classList.add('side-up');
    } else if (st + window.innerHeight < document.body.offsetHeight) {
      nb.classList.remove('nav-up');
      sb.classList.remove('side-up');
    }

    this.slideSidebar();
    this.setState({ lastScrollTop: st });
  },
  slideSidebar: function () {
    var st = document.body.scrollTop;
    var promo =  document.querySelector('.promotron');
    var promoHeight = promo.offsetHeight;
    var sb =  document.querySelector('.sidebar');

    // remove initialized display
    sb.classList.remove('hide');

    // check if they scrolled past the promo or promo is there but not loaded (i.e. 0 height)
    if (promo && (st < promoHeight || promoHeight === 0)) {
      sb.classList.add('side-right');
    } else {
      sb.classList.remove('side-right');
    }
  },
  render: function () {
    return (
      <header className="navbar">
        <nav className="navbar-nav group">
          <a href="#" className="navbar-logo float-left">
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

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
      if (sb) { sb.classList.add('side-up'); }
    } else {
      nb.classList.remove('nav-up');
      if (sb) { sb.classList.remove('side-up'); }
    }

    this.slideSidebar();
    this.setState({ lastScrollTop: st });
  },
  slideSidebar: function () {
    var st = document.body.scrollTop;
    var promo =  document.querySelector('.promotron');
    var sb =  document.querySelector('.sidebar');

    // check if they scrolled past the promo or promo is there but not loaded (i.e. 0 height)
    if (promo && (st < promo.offsetHeight || promo.offsetHeight === 0)) {
      sb.classList.add('side-right');
    } else if (sb) {
      sb.classList.remove('side-right');
    }

    // remove initialized display
    if (sb) { sb.classList.remove('hide'); }
  },
  render: function () {
    return (
      <header className="navbar">
        <nav className="navbar-nav group">
          <a href="#" className="navbar-logo float-left">
            <div className="logo" />
          </a>

          {this.props.children}
        </nav>
      </header>
    );
  }
});

module.exports = Navbar;

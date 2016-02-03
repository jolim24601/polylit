var React = require('react'),
    CurrentAuthorStore = require('../stores/current_author_store'),
    StoriesIndex = require('./stories/stories_index'),
    Sidebar = require('./sidebar/sidebar');

var Home = React.createClass({
  // componentDidMount: function () {
  //   this.listener = CurrentAuthorStore.addListener(this.forceUpdate.bind(this));
  // },
  componentWillMount: function () {
    this.isFirstRender = true;
  },
  // componentWillUnmount: function () {
  //   this.listener.remove();
  // },
  componentDidUpdate: function () {
    this.isFirstRender = false;
  },
  render: function () {
    var promo, sidebar;
    if (!CurrentAuthorStore.isLoggedIn()
      && this.isFirstRender && this.props.location.pathname === "/") {
      promo = (
        <div className="promotron">
          <div className="inner-promotron">
            <div className="promo-content">
              <h2>Be Heard.</h2>
              <p>
                Polylit is for writers of all stripes to come and engage. There are no strangers here; Only friends you haven’t yet met.
              </p>
            </div>
            <img className="promotron"
              src="https://s3-us-west-2.amazonaws.com/jolim24601/polylit-prod/promotron.png" />
          </div>
        </div>
      );
    } else {
      sidebar = <Sidebar />;
    }


    return (
      <div id="page-wrap">
        {promo}
        {sidebar}
        <StoriesIndex location={{pathname: '/'}} />
      </div>
    );
  }
});

module.exports = Home;

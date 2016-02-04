var React = require('react'),
    CurrentAuthorStore = require('../stores/current_author_store'),
    StoriesIndex = require('./stories/stories_index');

var Home = React.createClass({
  componentWillMount: function () {
    this.isFirstRender = true;
  },
  componentDidUpdate: function () {
    this.isFirstRender = false;
  },
  render: function () {
    var promo;
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
    } 

    return (
      <div id="main-content">
        {promo}
        <StoriesIndex location={this.props.location} />
      </div>
    );
  }
});

module.exports = Home;

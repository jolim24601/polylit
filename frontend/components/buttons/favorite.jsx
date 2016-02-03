var React = require('react');
var FontAwesome = require('react-fontawesome');

var Favorite = React.createClass({
  favoriteStory: function () {

  },
  render: function () {
    (
      <FontAwesome
        onClick={this.favoriteStory}
        className="favorite-button floatLeft"
        name="fa fa-heart-o"
        />
    );
  }
});

module.exports = Favorite;

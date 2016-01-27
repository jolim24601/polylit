var React = require('react'),
    AuthorStore = require('../../stores/author_store');

var AuthorProfile = React.createClass({
  getInitialState: function () {
    return { author: AuthorStore.find(this.props.params.authorId) };
  },
  render: function () {
    var author = this.state.author;
    return (
      <div className="author-profile">
        <h3>{author.pen_name}</h3>
        <p>{author.description}</p>
        <div>Following</div><div>Followers</div><div>Twitter</div><div>FB</div>
        <button>Follow</button>
        <ul>Latest/Featured Stories</ul>
        <div>Recommended by {author.pen_name}</div>&middot;<a href="#">See all</a>
      </div>
    );
  }
});

module.exports = AuthorProfile;

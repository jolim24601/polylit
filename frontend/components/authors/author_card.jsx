var React = require('react'),
    AuthorStore = require('../../stores/author_store'),
    Follow = require('../buttons/follow');

var AuthorCard = React.createClass({
  getInitialState: function () {
    return { active: false };
  },
  showCard: function () {
    this.setState({ active: true });
  },
  componentWillUnmount: function () {
    window.clearTimeout(this.timeoutId);
  },
  clearTimer: function () {
    window.clearTimeout(this.timeoutId);
    this.setState({ active: false });
  },
  setTimer: function () {
    this.timeoutId = window.setTimeout(this.showCard, 1000);
  },
  render: function () {
    var author = this.props.author;

    var cardClass =
      this.state.active ? "profile-card" : "profile-card hide";
    return (
      <div
        onMouseEnter={this.setTimer}
        onMouseLeave={this.clearTimer}
        className="author-card-entry"
      >
        <img className="avatar-small float-left" src={author.avatar} alt={author.name} />
        <a href={author.url}>{author.name}</a>
        <div className={cardClass}>
          <img className="avatar-small float-right" src={author.avatar} alt={author.name} />
          <a className="card-title" href={author.url}>{author.name}</a>
          <p>{author.description}</p>
          <footer className="follow-footer">
            <small>Following {author.followingCount}</small>
            <small>Followers {author.follows.length}</small>

            <Follow followable={author} />
          </footer>
        </div>
      </div>
    );
  }
});

module.exports = AuthorCard;

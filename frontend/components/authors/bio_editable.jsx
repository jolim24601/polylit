var React = require('react');

var BioEditable = React.createClass({
  getInitialState: function () {
    return { name: '', description: '' };
  },
  render: function () {
    var field = this.props.field;
    var textFields;
    if (field.editable) {
      textFields = (
        <div className="author-info">
          <input type="text" value={field.name}
            onChange={this.props.changeName}>
          </input>
          <input type="text" value={field.description}
            onChange={this.props.changeDescription}>
          </input>
        </div>
      );
    } else {
      textFields = (
        <div className="author-info">
          <h3>{field.name}</h3>
          <p>{field.description}</p>
        </div>
      );
    }
    return ( <div className="author-bio">{textFields}</div> );
  }
});

module.exports = BioEditable;

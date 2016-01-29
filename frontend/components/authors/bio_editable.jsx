var React = require('react');

var BioEditable = React.createClass({
  render: function () {
    var field = this.props.field;
    var textFields;
    if (field.editable) {
      textFields = (
        <div className="author-info">
          <input type="text" value={field.name}
            onChange={this.props.changeName}>
          </input>
          <textarea type="text" value={field.description}
            placeholder="Enter a short bio"
            onChange={this.props.changeDescription}>
          </textarea>
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

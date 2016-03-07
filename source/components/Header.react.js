var React = require('react');

var Header = React.createClass({

  getDefaultProps: function () {
    return {
      text: 'Weather Application'
    };
  },

  render: function () {
    return (
      <h1 className="principal-header">{this.props.text}</h1>
    );
  }
});

module.exports = Header;

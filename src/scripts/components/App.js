var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

module.exports = App;

var React = require('react');
var ReactDOM = require('react-dom');

var MapDragon = React.createClass({
  render: function() {
    return (
      <div>
        <h2>double-click to add icons to the canvas</h2>
        <div id="canvas-container">
          <canvas ref="canvas" />
        </div>
      </div>
    );
  }
});

module.exports = MapDragon;

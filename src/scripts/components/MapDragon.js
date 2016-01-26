var React = require('react');
var ReactDOM = require('react-dom');
var mousePosition = require('../classes/helpers').relativeMousePos;

var MapDragon = React.createClass({
  getInitialState: function(){
    return {
      steadings: []
    };
  },
  componentDidMount: function() {
    var context = this.refs.canvas.getContext('2d');
    this.setState({
      context: context
    });
  },
  getMouse: function(e){
    //TODO will become redundant.. using for logging purposes now
    var mouse = mousePosition(e);
    console.log(mouse);
    return mouse;
  },
  handleDoubleClick: function(e){
    e.preventDefault();
    this.getMouse(e);
  },
  render: function() {
    return (
      <div>
        <h2>double-click to add icons to the canvas</h2>
        <div id="canvas-container">
          <canvas onDoubleClick={this.handleDoubleClick} width="500" height="500" ref="canvas" />
        </div>
      </div>
    );
  }
});

module.exports = MapDragon;

var React = require('react');
var ReactDOM = require('react-dom');

//helpers
var mousePosition = require('../classes/helpers').relativeMousePos;

//components
var Popup = require('./Popup');

var MapDragon = React.createClass({
  getInitialState: function(){
    return {
      steadings: []
    };
  },
  componentDidMount: function() {
    var context = this.refs.canvas.getContext('2d');
    this.setState({
      context: context,
    });
  },
  getMouse: function(e){
    //TODO will become redundant.. using for logging purposes now
    var mouse = mousePosition(e);
    console.log(mouse);
    return mouse;
  },
  handleDoubleClick: function(e){
    // e.preventDefault();//is this necessary?  need to prevent text highlighting
    var m = mousePosition(e);
    this.refs.popup.show(m.x, m.y);
  },
  render: function() {
    return (
      <div>
        <h2>double-click to add icons to the canvas</h2>
        <div id="canvas-container">
          <canvas onDoubleClick={this.handleDoubleClick} width="500" height="500" ref="canvas" />
          <Popup ref="popup"/>
        </div>
      </div>
    );
  }
});

module.exports = MapDragon;

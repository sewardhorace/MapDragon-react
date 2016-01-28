//TODO lots of room for optimization
var React = require('react');
var ReactDOM = require('react-dom');
var Steading = require('../classes/Steading');

//helpers
var mousePosition = require('../classes/helpers').relativeMousePos;
var SetIntervalMixin = require('../classes/helpers').SetIntervalMixin;

//components
var Popup = require('./Popup');

var MapDragon = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function(){
    var spriteSheet = new Image();
    spriteSheet.src = 'static/assets/images/cowboyspritestrip.png';
    var steading = new Steading({
      x: 60,
      y: 140,
      img: spriteSheet,
      name: "Title",
      width: 64
    });
    return {
      steadings: [steading],
    };
  },
  componentDidMount: function() {
    this.setInterval(this.draw, 30);
    var context = this.refs.canvas.getContext('2d');
    this.setState({
      ctx: context,
      dragoffx: 0,
      dragoffy: 0,
      selection: null,
      dragging: false,
      valid: false
    });
  },
  getMouse: function(e){
    //TODO will become redundant.. using for logging purposes now
    var mouse = mousePosition(e);
    console.log(mouse);
    return mouse;
  },
  onMouseDown: function(e){
    //TODO clicking on a steading should move it to the end of the array
    var mouse = mousePosition(e);
    var mx = mouse.x;
    var my = mouse.y;
    var steadings = this.state.steadings;
    for (var i = steadings.length-1; i >= 0; i--) {
      if (steadings[i].contains(mx, my)) {
        var mySel = steadings[i];
        // Keep track of where in the object we clicked
        // so we can move it smoothly (see mousemove)
        this.setState({
          dragoffx: mx - mySel.x,
          dragoffy: my - mySel.y,
          selection: mySel,
          dragging: true,
          valid: false
        });
        return;
      }
    }
  },
  onMouseMove: function(e){
    if (this.state.dragging){
      var mouse = mousePosition(e);
      // We don't want to drag the object by its top-left corner, we want to drag it
      // from where we clicked. Thats why we saved the offset and use it here
      var selection = this.state.selection;
      selection.x = mouse.x - this.state.dragoffx;
      selection.y = mouse.y - this.state.dragoffy;
      this.setState({
        valid: false
      });
    }
  },
  onMouseUp: function(e){
    this.setState({
      dragging: false,
      selection: null,
      valid: false
    });
  },
  onDoubleClick: function(e){
    e.preventDefault();//is this necessary?  need to prevent text highlighting
    var m = mousePosition(e);
    this.refs.popup.show(m.x, m.y);
  },
  clear: function(){
    this.state.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  },
  draw: function(){
    // if our state is invalid, redraw and validate!
    if (!this.state.valid) {
      var ctx = this.state.ctx;
      var steadings = this.state.steadings;
      this.clear();

      // ** Add stuff you want drawn in the background all the time here **

      // draw all steadings
      //TODO consider steadings.each-type syntax
      var l = steadings.length;
      for (var i = 0; i < l; i++) {
        var steading = steadings[i];
        // We can skip the drawing of elements that have moved off the screen:
        if (steading.x > this.refs.canvas.width || steading.y > this.refs.canvas.height ||
            steading.x + steading.width < 0 || steading.y + steading.width < 0) continue;
        steadings[i].draw(ctx);
      }

      // draw selection
      // right now this is just a stroke along the edge of the selected image
      if (this.state.selection != null) {
        ctx.strokeStyle = this.selectionColor;
        ctx.lineWidth = this.selectionWidth;
        var mySel = this.state.selection;
        ctx.strokeRect(mySel.x,mySel.y,mySel.width,mySel.width);
      }

      // ** Add stuff you want drawn on top all the time here **

      this.setState({
        valid: true
      });
    }
  },
  render: function() {
    return (
      <div>
        <h2>double-click to add icons to the canvas</h2>
        <div id="canvas-container">
          <canvas
            ref="canvas"
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onDoubleClick={this.onDoubleClick}
            width="500" height="500" />
          <Popup ref="popup"/>
        </div>
      </div>
    );
  }
});

module.exports = MapDragon;

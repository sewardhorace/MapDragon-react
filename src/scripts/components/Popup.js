var React = require('react');
var ReactDOM = require('react-dom');

var Popup = React.createClass({
  getInitialState: function(){
    return {
      options: this.props.options,
      selectedOptionIdx: -1,
      x: 0,
      y: 0,
      visible: false
    };
  },
  componentDidMount: function(){
  },
  componentDidUpdate: function(prevProps, prevState){
    if (this.state.visible === true){
      this.refs.steadingNameInput.focus();
    }
  },
  //should "show" & "hide" live in the mapdragon component?
  show: function(x, y){
    this.setState({
      x: x,
      y: y,
      visible: true
    });
  },
  hide: function(){
    this.setState({
      visible: false
    });
  },
  popupOptionClicked: function(idx) {
    this.setState({
      selectedOptionIdx: idx
    });
  },
  addSteadingButtonClicked: function(){
    if (this.state.selectedOptionIdx > -1){
      var option = this.state.options[this.state.selectedOptionIdx];
      this.props.addSteading({
        x: this.state.x,
        y: this.state.y,
        offsetX: option.offsetX,
        offsetY: option.offsetY,
        name: this.refs.steadingNameInput.value
      });
      this.refs.steadingNameInput.value = "";
      this.setState({
        selectedOptionIdx: -1
      });
    }
    this.hide();
  },
  cancelButtonClicked: function(){
    this.hide();
  },
  render: function() {
    if (this.state.visible) {
      var options = this.props.options;
      var popupOptions = [];
      var frameStyle, imgStyle;
      for (var i = 0; i < options.length; i ++) {
        imgStyle = {
          left: options[i].offsetX * -1,
          top: options[i].offsetY
        };
        frameStyle = {
          height: options[i].height,
          width: options[i].width
        };
        var className = "popup-item";
        if (this.state.selectedOptionIdx === i) {
          className += " selected";
        }
        popupOptions.push(
          <li
            className={className}
            key={i}
            onClick={this.popupOptionClicked.bind(null, i)} >
            <div
              className="popup-icon-frame"
              style={frameStyle}>
              <img
                className="popup-icon-image"
                style={imgStyle}
                src={'static/assets/images/cowboyspritestrip.png'}/>
            </div>
          </li>
        );
      }
      var popupStyle = {
        left: this.state.x,
        top: this.state.y
      };
      return (
        <div id="popup" style={popupStyle}>
          <div className="popup-nav">
            <input ref="steadingNameInput" className="nav-title nav-left" placeholder="Title (optional)"/>
            <div onClick={this.cancelButtonClicked} className="nav-item nav-right">x</div>
            <div onClick={this.addSteadingButtonClicked} className="nav-item nav-right">+</div>
          </div>
          <div className="popup-window">
            <ul className="popup-options">
              {popupOptions}
            </ul>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
});

module.exports = Popup;

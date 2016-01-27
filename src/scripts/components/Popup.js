var React = require('react');
var ReactDOM = require('react-dom');

var Popup = React.createClass({
  getInitialState: function(){
    var spriteSheet = new Image();
    spriteSheet.src = 'static/assets/images/cowboyspritestrip.png';
    return {
      options:[],
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
  render: function() {
    var popupStyle = {
      left: this.state.x,
      top: this.state.y
    };
    if (this.state.visible) {
      return (
        <div id="popup" style={popupStyle}>
          <div className="popup-nav">
            <input ref="steadingNameInput" className="nav-title nav-left" placeholder="Title (optional)"/>
            <div className="nav-item nav-right">x</div>
            <div className="nav-item nav-right">+</div>
          </div>
          <div className="popup-window">
            <ul className="popup-options">
              <li className="popup-item">
                <div className="popup-icon-frame">
                  <img className="popup-icon-image"/>
                </div>
              </li>
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

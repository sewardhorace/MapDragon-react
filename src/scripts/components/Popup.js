var React = require('react');
var ReactDOM = require('react-dom');

var Popup = React.createClass({
  getInitialState: function(){
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
  addSteadingButtonClicked: function(){
    console.log(this.refs.steadingNameInput.value);
  },
  cancelButtonClicked: function(){
    this.hide();
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
            <div onClick={this.cancelButtonClicked} className="nav-item nav-right">x</div>
            <div onClick={this.addSteadingButtonClicked} className="nav-item nav-right">+</div>
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

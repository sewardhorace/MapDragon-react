var React = require('react');
var ReactDOM = require('react-dom');

var Popup = React.createClass({
  render: function() {
    return (
      <div id="popup" className="hidden">
        <div className="popup-nav">
          <input className="nav-title nav-left" placeholder="Title (optional)">
          <div className="nav-item nav-right">x</div>
          <div className="nav-item nav-right">+</div>
        </div>
        <div className="popup-window">
          <ul className="popup-options">
            <li className="popup-item">
              <div className="popup-icon-frame">
                <img className="popup-icon-image">
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Popup;

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Nav = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: false,
      username: "",
      password: ""
    };
  },
  onFormSubmit: function(e){
    e.preventDefault();
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    console.log("submitted");
    console.log(data);

  },
  onChange: function(e){
    var state = {};
    state[e.target.name] =  $.trim(e.target.value);
    this.setState(state);
  },
  render: function(){
    if (this.state.loggedIn){
      return (
        <div>
          <form onSubmit={this.onFormSubmit}>
            <input name="username" type="text" placeholder="username" onChange={this.onChange}/>
            <input name="password" type="password" placeholder="password" onChange={this.onChange}/>
            <button type="submit">Log In</button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = Nav;

var React = require('react');
var ApiUtil = require('../util/api_util.js');

var Sidebar = React.createClass({
  getInitialState: function () {
    return {showing: false};
  },

  show: function () {
    this.setState({showing: true});
  },

  hide: function () {
    this.setState({showing: false});
  },

  render: function () {
    var show = this.state.showing ? "show" : "hide";
    return (
      <div className={"sidebar" + " " + show}>
        <button className="close" onClick={this.hide}><i className="fa fa-times"></i></button>
        <h1>Menu</h1>
        <div className="board-action">
          Add members
        </div>
        <div className="board-action">
          Filter cards
        </div>
        <div className="board-action">
          Activity
        </div>
      </div>
    );
  }

});

module.exports = Sidebar;
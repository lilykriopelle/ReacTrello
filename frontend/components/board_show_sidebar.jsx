var React = require('react');
var ApiUtil = require('../util/api_util.js');
var enhanceWithClickOutside = require('react-click-outside');

var Sidebar = React.createClass({

  render: function () {
    return (
      <div className="sidebar">
        <button className="close" onClick={this.props.toggleSidebar}><i className="fa fa-times"></i></button>
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

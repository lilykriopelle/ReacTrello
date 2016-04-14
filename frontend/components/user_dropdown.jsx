var React = require('react');
var ApiUtil = require('../util/api_util.js');
var UIActions = require('../actions/ui_actions.js');
var DropdownStore = require('../stores/dropdown_store.js');
var UserDropdown = React.createClass({

  getInitialState: function () {
    return { visible: DropdownStore.userDropdownExpanded() };
  },

  componentDidMount: function () {
    this.callbackToken = DropdownStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.callbackToken.remove();
  },

  _onChange: function () {
    this.setState({ visible: DropdownStore.userDropdownExpanded() });
  },

  _toggleVisbility: function () {
    UIActions.toggleUserDropdown();
  },

  logOut: function () {
    ApiUtil.logOut();
  },

  render: function () {
    var user = "";
    if (this.state.user) {
      user = this.state.user.email;
    }

    var dropdown = "";
    if (this.state.visible) {
      dropdown = (
        <div className="user-dropdown-list">
          <ul>
            <li><a className="user-dropdown-button" href="#/profile">Profile</a></li>
            <li><button className="user-dropdown-button"  onClick={this.logOut}>Log Out</button></li>
          </ul>
        </div>
      );
    }
    return (
      <div className="user-dropdown">
        <a className="reveal-user-menu" onClick={this._toggleVisbility}>lily</a>
        {dropdown}
      </div>
    );
  }

});

module.exports = UserDropdown;

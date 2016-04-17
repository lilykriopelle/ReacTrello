var React = require('react');
var ApiUtil = require('../util/api_util.js');
var UIActions = require('../actions/ui_actions.js');
var DropdownStore = require('../stores/dropdown_store.js');
var CurrentUserStore = require('../stores/current_user_store.js');
var UserDropdown = React.createClass({

  getInitialState: function () {
    return { user: CurrentUserStore.currentUser(), visible: DropdownStore.userDropdownExpanded() };
  },

  componentDidMount: function () {
    this.dropdownCallbackToken = DropdownStore.addListener(this._onDropdownChange);
    this.currentUserCallbackToken = CurrentUserStore.addListener(this._onCurrentUserChange);
    ApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.dropdownCallbackToken.remove();
  },

  _onDropdownChange: function () {
    this.setState({ visible: DropdownStore.userDropdownExpanded() });
  },

  _onCurrentUserChange: function () {
    this.setState({user: CurrentUserStore.currentUser()});
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
      user = (
        <p className="group" style={{background: "transparent"}}>
          <span className="thumb">
            <img src={this.state.user.avatar_url}/>
          </span>
          {this.state.user.email}
        </p>
      );
    }

    var dropdown = "";
    if (this.state.visible) {
      dropdown = (
        <div className="user-dropdown-list">
          <ul>
            <li><a className="user-dropdown-button" href="/profile">Profile</a></li>
            <li><button className="user-dropdown-button"  onClick={this.logOut}>Log Out</button></li>
          </ul>
        </div>
      );
    }
    return (
      <div className="user-dropdown" onClick={this._toggleVisbility}>
        <div className="reveal-user-menu">
          {user}
        </div>
        {dropdown}
      </div>
    );
  }

});

module.exports = UserDropdown;

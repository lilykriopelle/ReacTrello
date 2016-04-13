var React = require('react');
var ApiUtil = require('../util/api_util.js');

var UserDropdown = React.createClass({

  getInitialState: function () {
    return { visible: false };
    // return { user: CurrentUserStore.user(), visible: false };
  },

  componentDidMount: function () {
    // this.callbackToken = CurrentUserStore.addListener(this._onChange);
    // ApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.callbackToken.remove();
  },

  _onChange: function () {
    // this.setState({ user: CurrentUserStore.user() });
  },

  _toggleVisbility: function () {
    this.setState({visible: !this.state.visible});
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

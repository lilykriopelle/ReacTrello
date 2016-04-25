var React = require('react');
var ApiUtil = require('../util/api_util.js');
var BoardMembershipForm = require('./board_membership_form.jsx');
var MemberTile = require('./member_tile.jsx');

var Sidebar = React.createClass({
  getInitialState: function () {
    return {showing: false, userMenu: false, user: ""};
  },

  show: function () {
    this.setState({showing: true});
  },

  hide: function () {
    this.setState({showing: false});
  },

  displayUserMenu: function (membership) {
    this.setState({userMenu: true, membership: membership});
  },

  collapseUserMenu: function () {
    this.setState({userMenu: false, user: ""});
  },

  removeMember: function (e) {
    ApiUtil.removeBoardMember(this.state.membership, this.collapseUserMenu);
  },

  userMenu: function () {
    return (
      <div className="user-menu">
        <div className="close" onClick={this.collapseUserMenu}><i className="fa fa-times"></i></div>
        <div className="group user-details">
          <div className="big-thumb">
            <img src={this.state.membership.user.avatar_url}/>
          </div>
          <div>{this.state.membership.user.email}</div>
        </div>
        <div className="remove-member" onClick={this.removeMember}>Remove from Board...</div>
      </div>
    );
  },

  render: function () {
    var show = this.state.showing ? "show" : "hide";
    var shouldDisplayMembers = this.props.board && this.props.board.memberships;
    var memberships;
    if (shouldDisplayMembers) {
       memberships = this.props.board.memberships;
    }

    var userMenu = "";
    if (this.state.userMenu) {
      userMenu = this.userMenu();
    }

    return (
      <div className={"sidebar" + " " + show}>
        <button className="close" onClick={this.hide}><i className="fa fa-times"></i></button>
        <h1>Menu</h1>
        <div className="board-action">
          <ul className="members group">
            {
               shouldDisplayMembers && memberships.map(function (membership) {
                return <MemberTile key={membership.id} membership={membership} displayMenu={this.displayUserMenu}/>;
              }.bind(this))
            }
          </ul>
          {userMenu}
          <BoardMembershipForm board={this.props.board}/>
        </div>
        <div className="board-action">
          Filter Cards
        </div>
        <div className="board-action">
          Leave Board
        </div>
      </div>
    );
  }

});

module.exports = Sidebar;

var React = require('react');
var ApiUtil = require('../util/api_util.js');
var BoardMembershipForm = require('./board_membership_form.jsx');

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
          <ul className="members group">
            {
              this.props.board && this.props.board.members.map(function (user) {
                return (
                  <div className="member big-thumb" key={user.id}>
                    <img src={user.avatar_url} title={user.email}/>
                  </div>
                );
              })
            }
          </ul>
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

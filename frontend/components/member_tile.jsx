var React = require('react');

var MemberTile = React.createClass({

  displayMenu: function () {
    this.props.displayMenu(this.props.membership);
  },

  render: function () {
    var membership = this.props.membership;
    return (
      <div>
        <div className="member big-thumb" onClick={this.displayMenu}>
          <img src={membership.user.avatar_url} title={membership.user.email}/>
        </div>
      </div>
    );
  }
});

module.exports = MemberTile;

var React = require('react');

var Profile = React.createClass({
  render: function () {
    var board = this.props.board;
    return (
      <div>
        <header className="profile-header">
          <div className="user-details group">
            <div className="profile-picture">
              <span className="overlay"></span>
            </div>
            <div className="name-details">
              <h1>USER PROFILE</h1>
              <button>Edit Profile</button>
            </div>
          </div>
        </header>
      </div>
    );
  }
});

module.exports = Profile;

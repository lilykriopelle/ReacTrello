var React = require('react');
var CurrentUserStore = require('../stores/current_user_store.js');

var Profile = React.createClass({

  getInitialState: function() {
    return { imageUrl: "", imageFile: null, user: CurrentUserStore.currentUser()};
  },

  componentDidMount: function () {
    this.token = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  _onChange: function () {
    this.setState({user: CurrentUserStore.currentUser()});
  },

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function() {
      if (file) {
        var formData = new FormData();
        formData.append("user[avatar]", file);
        ApiUtil.changeProfilePicture(formData);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "" });
    }
  },

  render: function () {
    var img;
    if (this.state.user) {
      img = <img src={this.state.user.avatar_url}/>;
    } else {
      img = "";
    }
    return (
      <div>
        <header className="profile-header">
          <div className="user-details group">
            <div className="profile-picture">
              {img}
              <div className="overlay">
                Change
                <input className="file-input" type="file" onChange={this.changeFile} />
              </div>
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

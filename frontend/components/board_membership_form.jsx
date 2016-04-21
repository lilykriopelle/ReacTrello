var React = require('react');
var SearchResultsStore = require('../stores/search_results_store.js');
var BoardMembershipForm = React.createClass({

  getInitialState: function () {
    return { memberForm: false, users: [], query: "" };
  },

  componentDidMount: function () {
    this.token = SearchResultsStore.addListener(this._updateUsers);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  _updateUsers: function () {
    this.setState({users: SearchResultsStore.users()});
  },

  expandMemberForm: function () {
    this.setState({memberForm: true});
  },

  _closeForm: function () {
    this.setState({memberForm: false});
  },

  _search: function (e) {
    this.setState({query: e.currentTarget.value});
    ApiUtil.searchUsers(e.currentTarget.value);
  },

  render: function () {
    var popUp = "";
    if (this.state.memberForm) {
      popUp = (
        <form className="member-form">
          <h1 className="quiet">Members</h1>
          <div className="close" onClick={this._closeForm}><i className="fa fa-times"></i></div>
          <input placeholder="e.g. lily@gmail.com" onChange={this._search} value={this.state.query}/>
          {this.state.users.map(function(user){ return user.email; }).join(", ")}
          <p className="quiet">Search for a person in Mello by email address.</p>
        </form>
      );
    }
    return (
      <div>
        <h2 className="add-members" onClick={this.expandMemberForm}>Add members...</h2>
        {popUp}
      </div>
    );
  }
});

module.exports = BoardMembershipForm;

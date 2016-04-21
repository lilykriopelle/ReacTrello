var React = require('react');

var BoardMembershipForm = React.createClass({
  getInitialState: function () {
    return {memberForm: false};
  },

  expandMemberForm: function () {
    this.setState({memberForm: true});
  },

  _closeForm: function () {
    this.setState({memberForm: false});
  },

  render: function () {
    var popUp = "";
    if (this.state.memberForm) {
      popUp = (
        <form className="member-form">
          <h1 className="quiet">Members</h1>
          <div className="close" onClick={this._closeForm}><i className="fa fa-times"></i></div>
          <input placeholder="e.g. lily@gmail.com"/>
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

var React = require('react');
var ApiUtil = require('../util/api_util.js');

var CommentForm = React.createClass({
  getInitialState: function () {
    return {body: ""};
  },

  _onChange: function (e) {
    this.setState({body: e.currentTarget.value});
  },

  _submit: function (e) {
    e.preventDefault();
    ApiUtil.createComment(this.props.card.id, this.state.body, this.props.board.id, function () {
      this.setState({body: ""});
    }.bind(this));
  },

  render: function () {
    return (
      <div className="comment-form">
        <h3>Add Comment</h3>
        <form onSubmit={this._submit}>
          <textarea onChange={this._onChange} value={this.state.body} placeholder="Write a comment..."/>
          <button className="gray-button" disabled={this.state.body === ""}>Send</button>
        </form>
      </div>
    );
  }
});

module.exports = CommentForm;

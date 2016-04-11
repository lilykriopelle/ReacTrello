var React = require('react');
var ApiUtil = require('../util/api_util.js');

var ListForm = React.createClass({

  randomPlaceholder: function () {
    return this.placeholders[ Math.floor(Math.random() * this.placeholders.length) ];
  },

  getInitialState: function () {
    return { composing: false, title: "" };
  },

  _onChange: function (e) {
    this.setState({ title: e.currentTarget.value });
  },

  _startComposing: function () {
    this.setState({ composing: true });
  },

  _stopComposing: function (e) {
    e && e.preventDefault();
    this.setState({ composing: false, title: "" });
  },

  _submitList: function (e) {
    e.preventDefault();
    ApiUtil.createList({
      boardId: this.props.boardId,
      title: this.state.title
    }, this._stopComposing);
  },

  render: function () {
    if (!this.state.composing) {
      return <button className="open-list-form"onClick={this._startComposing}>Add a list...</button>;
    } else {
      return (
        <form className="new-list-form" onSubmit={this._submitList}>
          <input
            type="text"
            onChange={this._onChange}
            value={this.state.title}
            placeholder="Add a list..."/>
          <div className="group">
            <button className="add">Create</button>
            <button className="close" onClick={this._stopComposing}><i className="fa fa-times"></i></button>
          </div>
        </form>
      );
    }
  }

});

module.exports = ListForm;

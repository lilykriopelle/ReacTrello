var React = require('react');
var enhanceWithClickOutside = require('react-click-outside');
var ApiUtil = require('../util/api_util.js');

var BoardTitleEditForm = React.createClass({

  getInitialState: function () {
    return {editedTitle: this.props.board.title};
  },

  updateEditedTitle: function (e) {
    this.setState({editedTitle: e.currentTarget.value});
  },

  updateBoard: function (e) {
    e.preventDefault();
    ApiUtil.updateBoard({title: this.state.editedTitle, id: this.props.board.id}, this.props.collapse);
  },

  handleClickOutside: function () {
    this.props.collapse();
  },

  render: function () {
    return (
      <form className="new-board-form">
        <h1>Rename Board</h1>
        <input value={this.state.editedTitle} onChange={this.updateEditedTitle}/>
        <button onClick={this.updateBoard}>Rename</button>
      </form>
    );
  }

});

module.exports = enhanceWithClickOutside(BoardTitleEditForm);

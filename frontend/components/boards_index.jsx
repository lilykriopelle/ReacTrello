var React = require('react');
var BoardStore = require('../stores/board_store.js');
var ApiUtil = require('../util/api_util.js');
var Board = require('./board.jsx');

var BoardsIndex = React.createClass({

  getInitialState: function () {
    return { boards: BoardStore.all() };
  },

  componentDidMount: function () {
    this.callbackToken = BoardStore.addListener(this._onChange);
    ApiUtil.fetchBoards();
  },

  componentWillUnmount: function () {
    this.callbackToken.remove();
  },

  _onChange: function () {
    this.setState({ boards: BoardStore.all() });
  },

  render: function () {
    return (
      <div className="boards-index group">
        <ul className="boards-list">
          { Object.keys(this.state.boards).map(function (boardId) {
            return <Board key={boardId} board={this.state.boards[boardId]} />;
          }.bind(this)) }
        </ul>
      </div>
    );
  }

});

module.exports = BoardsIndex;

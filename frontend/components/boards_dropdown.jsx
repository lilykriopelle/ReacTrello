var React = require('react');
var BoardStore = require('../stores/board_store.js');
var ApiUtil = require('../util/api_util.js');

var BoardsDropdown = React.createClass({

  getInitialState: function () {
    return { boards: BoardStore.all(), visible: false };
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

  _toggleVisbility: function () {
    this.setState({visible: !this.state.visible});
  },

  render: function () {
    var boards = "";
    if (this.state.visible) {
      boards = (
        <div className="board-dropdown-list">
          <h1>My Boards</h1>
          <ul>
            { Object.keys(this.state.boards).map(function (boardId) {
              return (
                <li className="board-list-li" key={boardId}>
                  <a href={"#/boards/" + boardId}>
                    {this.state.boards[boardId].title}
                  </a>
                </li>
              );
            }.bind(this)) }
          </ul>
        </div>
      );
    }
    return (
      <div className="boards-dropdown">
        <a className="reveal-boards" onClick={this._toggleVisbility}>Boards</a>
        {boards}
      </div>
    );
  }

});

module.exports = BoardsDropdown;

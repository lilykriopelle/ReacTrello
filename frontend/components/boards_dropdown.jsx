var React = require('react');
var BoardStore = require('../stores/board_store.js');
var ApiUtil = require('../util/api_util.js');
var DropdownStore = require('../stores/dropdown_store.js');
var UIActions = require('../actions/ui_actions.js');

var BoardsDropdown = React.createClass({

  _toggleVisbility: function () {
    UIActions.toggleBoardsDropdown();
  },

  getInitialState: function () {
    return { boards: BoardStore.all(), visible: DropdownStore.boardsDropdownExpanded() };
  },

  componentDidMount: function () {
    this.callbackToken = BoardStore.addListener(this._onBoardsChange);
    this.dropdownToken = DropdownStore.addListener(this._onVisibilityChange);
    ApiUtil.fetchBoards();
  },

  componentWillUnmount: function () {
    this.callbackToken.remove();
    this.dropdownToken.remove();
  },

  _onBoardsChange: function () {
    this.setState({ boards: BoardStore.all() });
  },

  _onVisibilityChange: function () {
    this.setState({ visible: DropdownStore.boardsDropdownExpanded() });
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
                  <a href={"/boards/" + boardId}>
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

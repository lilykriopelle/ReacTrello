var AppDispatcher = require('../dispatcher/dispatcher');
var BoardConstants = require('../constants/board_constants.js');
ApiActions = {
  receiveBoards: function(boards) {
    AppDispatcher.dispatch({
      actionType: BoardConstants.BOARDS_RECEIVED,
      boards: boards
    });
  },

  receiveBoard: function(board) {
    AppDispatcher.dispatch({
      actionType: BoardConstants.BOARD_RECEIVED,
      board: board
    });
  },

  receiveCard: function(card) {
    AppDispatcher.dispatch({
      actionType: BoardConstants.CARD_RECEIVED,
      card: card
    });
  }
};

window.ApiActions = ApiActions;

module.exports = ApiActions;

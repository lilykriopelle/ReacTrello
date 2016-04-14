var AppDispatcher = require('../dispatcher/dispatcher');
var BoardConstants = require('../constants/board_constants.js');
var ListConstants = require('../constants/list_constants.js');
var CurrentUserConstants = require('../constants/current_user_constants.js');

var ApiActions = {
  receiveCurrentUser: function (user) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.CURRENT_USER_RECEIVED,
      user: user
    });
  },

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

  receiveList: function(list) {
    AppDispatcher.dispatch({
      actionType: ListConstants.LIST_RECEIVED,
      list: list
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

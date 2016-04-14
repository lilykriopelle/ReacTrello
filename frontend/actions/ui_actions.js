var AppDispatcher = require('../dispatcher/dispatcher');
var BoardConstants = require('../constants/board_constants.js');
var UIConstants = require('../constants/ui_constants.js');

var UIActions = {
  changeCardList: function (boardId, card, newListId, newOrd) {
    AppDispatcher.dispatch({
      actionType: BoardConstants.CARD_LIST_CHANGED,
      boardId: boardId,
      card: card,
      newListId: newListId,
      newOrd: newOrd
    });
  },

  expandContainer: function (listId, dropBinOrd) {
    if (!AppDispatcher.isDispatching()) {
      AppDispatcher.dispatch({
        actionType: UIConstants.EXPAND_DROP_BIN,
        listId: listId,
        dropBinOrd: dropBinOrd
      });
    }
  },

  collapseAll: function () {
    AppDispatcher.dispatch({
      actionType: UIConstants.RESET_BINS
    });
  },

  toggleUserDropdown: function () {
    AppDispatcher.dispatch({
      actionType: UIConstants.TOGGLE_USER_DROPDOWN
    });
  },

  toggleBoardsDropdown: function () {
    AppDispatcher.dispatch({
      actionType: UIConstants.TOGGLE_BOARDS_DROPDOWN
    });
  },

  collapseAllDropdowns: function () {
    AppDispatcher.dispatch({
      actionType: UIConstants.COLLAPSE_ALL_DROPDOWNS
    });
  }
};

module.exports = UIActions;

var Store = require('flux/utils').Store;
var _boards = {};
var _callbacks = [];
var CHANGE_EVENT = "change";
var BoardConstants = require('../constants/board_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var BoardStore = new Store(AppDispatcher);

var resetBoards = function(newBoards) {
  _boards = {};
  newBoards.forEach(function (board) {
    _boards[board.id] = board;
  });
};

BoardStore.all = function () {
  return _boards;
};

Array.prototype.findById = function (id) {

  for (var i = 0; i < this.length; i++) {
    if (this[i].id == id) {
      return this[i];
    }
  }

  return -1;
};

BoardStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case BoardConstants.BOARDS_RECEIVED:
      resetBoards(payload.boards);
      BoardStore.__emitChange();
      break;
    case BoardConstants.BOARD_RECEIVED:
      _boards[payload.board.id] = payload.board;
      BoardStore.__emitChange();
      break;
    case BoardConstants.CARD_RECEIVED:
      var board = _boards[payload.card.board_id];
      var list = board.lists.findById(payload.card.list_id);
      list.cards.push(payload.card);
      BoardStore.__emitChange();
      break;
  }
};

module.exports = BoardStore;

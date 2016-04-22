var Store = require('flux/utils').Store;
var _boards = {};
var _callbacks = [];
var CHANGE_EVENT = "change";
var BoardConstants = require('../constants/board_constants');
var ListConstants = require('../constants/list_constants');
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

BoardStore._addList = function (list) {
  _boards[list.board_id].lists.push(list);
};

BoardStore._switchCard = function (oldList, newList, card, newIndex) {
  oldList.cards.splice(oldList.cards.indexOf(oldList.cards.findById(card.id)),1);
  card.list_id = newList.id;
  newList.cards.splice(newIndex, 0, card);
  BoardStore._updateOrds(oldList);
  BoardStore._updateOrds(newList);
};

BoardStore._updateOrds = function (list) {
  list.cards.forEach(function (card, index) {
    card.ord = index;
  });
};

BoardStore._addMember = function (membership) {
  _boards[membership.board_id].members.push(membership.user);
};

BoardStore._addComment = function (board_id, comment) {
  _boards[board_id].lists.forEach(function (list) {
    list.cards.forEach(function (card) {
      if (card.id == comment.card_id) {
        card.comments.push(comment);
      }
    });
  });
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
      var aCard = list.cards.findById(payload.card.id);
      if (aCard !== -1) {
        list.cards.splice(list.cards.indexOf(aCard), 1, payload.card);
      } else {
        list.cards.push(payload.card);
      }
      BoardStore.__emitChange();
      break;
    case BoardConstants.CARD_LIST_CHANGED:
      var newList = _boards[payload.boardId].lists.findById(payload.newListId);
      var oldList = _boards[payload.boardId].lists.findById(payload.card.list_id);
      BoardStore._switchCard(oldList, newList, payload.card, payload.newOrd);
      BoardStore.__emitChange();
      break;
    case ListConstants.LIST_RECEIVED:
      BoardStore._addList(payload.list);
      BoardStore.__emitChange();
      break;
    case BoardConstants.MEMBERSHIP_RECEIVED:
      BoardStore._addMember(payload.membership);
      BoardStore.__emitChange();
      break;
    case BoardConstants.COMMENT_RECEIVED:
      BoardStore._addComment(payload.boardId, payload.comment);
      BoardStore.__emitChange();
      break;
  }
};

module.exports = BoardStore;

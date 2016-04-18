var ApiActions = require('../actions/api_actions.js');
var BoardStore = require('../stores/board_store.js');

var ApiUtil = {
  fetchBoards: function () {
    $.ajax({
      url: '/api/boards',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        ApiActions.receiveBoards(data);
      }.bind(this)
    });
  },

  fetchSingleBoard: function (id) {
    $.ajax({
      url: '/api/boards/' + id,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        ApiActions.receiveBoard(data);
      }.bind(this)
    });
  },

  createCard: function (cardData, callback) {
    $.ajax({
      url: '/api/cards',
      method: 'POST',
      dataType: 'json',
      data: {
        card: {
          title: cardData.title,
          list_id: cardData.listId
        }
      },
      success: function(data) {
        ApiActions.receiveCard(data);
        callback && callback();
      }.bind(this)
    });
  },

  updateCard: function (card, callback) {
    $.ajax({
      url: '/api/cards/' + card.id,
      method: 'PATCH',
      dataType: 'json',
      data: {
        card: card
      },
      success: function(data) {
        ApiActions.receiveCard(data);
        callback && callback();
      }.bind(this)
    });
  },

  createList: function (listData, callback) {
    $.ajax({
      url: '/api/lists',
      method: 'POST',
      dataType: 'json',
      data: {
        list: {
          title: listData.title,
          board_id: listData.boardId
        }
      },
      success: function(data) {
        ApiActions.receiveList(data);
        callback && callback();
      }.bind(this)
    });
  },

  createBoard: function (board, callback) {
    $.ajax({
      url: '/api/boards',
      method: 'POST',
      dataType: 'json',
      data: { board: board },
      success: function(data) {
        ApiActions.receiveBoard(data);
        callback && callback();
      }.bind(this)
    });
  },

  updateBoard: function (board, callback) {
    $.ajax({
      url: '/api/boards/' + board.id,
      method: 'PATCH',
      dataType: 'json',
      data: { board: board },
      success: function(data) {
        ApiActions.receiveBoard(data);
        callback && callback();
      }.bind(this)
    });
  },

  updateCardOrder: function (listId, cards) {
    $.ajax({
      url: '/api/lists/' + listId,
      method: 'PATCH',
      dataType: 'json',
      data: {
        list: {
          cards: cards
        }
      }
    });
  },

  updateListOrder: function (boardId, lists) {
    $.ajax({
      url: '/api/boards/' + boardId + '/update_list_order',
      method: 'PATCH',
      dataType: 'json',
      data: {
        board: {
          lists: lists
        }
      }
    });
  },

  changeCardList: function (cardId, newListId) {
    $.ajax({
      url: '/api/cards/' + cardId,
      method: 'PATCH',
      dataType: 'json',
      data: {
        card: {
          list_id: newListId
        }
      },
      success: function (card) {
        var board = BoardStore.all()[card.board_id];
        ApiUtil.updateCardOrder(newListId, board.lists.findById(newListId).cards);
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: '/api/session',
      method: 'DELETE',
      dataType: 'json',
      success: function () {
        window.location = "";
      }
    });
  },

  changeProfilePicture: function (formData, callback) {
    $.ajax({
      url: '/api/session',
      type: 'PATCH',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function(post) {
        ApiActions.receiveCurrentUser(post);
        callback && callback();
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      url: '/api/session',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        ApiActions.receiveCurrentUser(data);
      }.bind(this)
    });
  }

};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;

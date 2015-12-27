var ApiActions = require('../actions/api_actions.js');

ApiUtil = {

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

  createCard: function (cardData) {
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
  }

};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;

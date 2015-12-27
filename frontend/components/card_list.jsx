var React = require('react');
var CardIndexItem = require('./card_index_item');
var PropTypes = React.PropTypes;
var ItemTypes = require('../constants/dnd_constants');
var DropTarget = require('react-dnd').DropTarget;

var CardList = React.createClass({

  compareCards: function(card1, card2){
    return card1.ord - card2.ord;
  },

  moveCard: function(hovering, target) {
    var cards = this.props.cards;

    var card = cards.filter(function (c) {
      return c.id === hovering.id;
    })[0];

    if (typeof card !== "undefined") {
      // card is not switching lists
      var afterCard = cards.filter(function (c) {
        return c.id === target.id;
      })[0];

      var cardOrder = card.ord;
      card.ord = afterCard.ord;
      afterCard.ord = cardOrder;

      cards.sort(this.compareCards);
      this.forceUpdate();
    } else {
      // card is switching lists
      // flux cycle - update hovering card's list_id to target.list_id and
      // modify store, subscribe top level board show to changes in board store
      // and rerender
      debugger
    }
  },

  updateCardOrder: function() {
    ApiUtil.updateCardOrder(this.props.listId, this.props.cards);
  },

  render: function () {
    var cards = this.props.cards;

    return (
      <ul className="cards">
        { cards.map(function (card, i) {
          return <CardIndexItem
                    key={card.id}
                    moveCard={this.moveCard}
                    drop={this.updateCardOrder}
                    card={card} />;
        }.bind(this)) }
      </ul>
    );
  }
});

module.exports = CardList;

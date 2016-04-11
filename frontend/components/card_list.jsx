var React = require('react');
var ReactDOM = require('react-dom');

var PropTypes = React.PropTypes;

var CardIndexItem = require('./card_index_item');
var DropBin = require('./drop_bin');

var ItemTypes = require('../constants/dnd_constants');

var BoardStore = require('../stores/board_store.js');
var UIActions = require('../actions/ui_actions');

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
      var afterCard = cards.filter(function (c) {
        return c.id === target.id;
      })[0];

      var cardOrder = card.ord;
      card.ord = afterCard.ord;
      afterCard.ord = cardOrder;

      cards.sort(this.compareCards);
      this.forceUpdate();
    }
  },

  updateCardOrder: function() {
    ApiUtil.updateCardOrder(this.props.list.id, this.props.cards);
  },

  _receiveCard: function(card) {
    ApiUtil.changeCardList(card.id, this.props.list.id);
    UIActions.changeCardList(card.board_id, card, this.props.list.id);
  },

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;

    var cards = this.props.cards;

    return (
      <div className="card-list">
        <ul className="cards">
          <DropBin list={this.props.list} ord={0}/>
          { cards.map(function (card, i) {
            return [
                      <CardIndexItem
                        key={card.id}
                        moveCard={this.moveCard}
                        drop={this.updateCardOrder}
                        card={card}
                        receiveCard={this._receiveCard} />,
                      <DropBin list={this.props.list} ord={i+1}/>
                    ];
          }.bind(this)) }
        </ul>
      </div>
    );
  }
});

module.exports = CardList;

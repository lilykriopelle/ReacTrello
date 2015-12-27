var React = require('react');
var CardForm = require('./card_form.jsx');
var CardList = require('./card_list');
var PropTypes = React.PropTypes;
var ItemTypes = require('../constants/dnd_constants');
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');


var List = React.createClass({

  render: function () {
    var list = this.props.list;
    return <li className="list">
      <p>{ list.title }</p>
      <CardList listId={list.id} cards={list.cards} />
      <CardForm listId={list.id}/>
    </li>;
  }

});

// var DragSourceDecorator = DragSource(ItemTypes.LIST, listSource,
//    function(connect, monitor) {
//      return {
//        connectDragSource: connect.dragSource(),
//        isDragging: monitor.isDragging()
//      };
//  });
//
//  var DropTargetDecorator = DropTarget(ItemTypes.LIST, listTarget,
//    function(connect) {
//      return {
//        connectDropTarget: connect.dropTarget()
//      };
//  });

// module.exports = DropTargetDecorator(DragSourceDecorator(CardIndexItem));

module.exports = DragDropContext(HTML5Backend)(List);

// module.exports = List;

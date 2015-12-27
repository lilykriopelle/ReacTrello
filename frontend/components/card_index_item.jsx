var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../constants/dnd_constants');
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var cardSource = {
  beginDrag: function (props) {
    return props.card;
  },

  endDrag: function (props, monitor, component) {
    // var dropped = props.card;
    // var droppedOn = monitor.getDropResult();
    //
    // if (dropped.list_id !== droppedOn.list_id) {
    //   // card is switching lists
    //   // debugger
    // }
  }
};

var cardTarget = {
  hover: function (props, monitor) {
    var target = props.card;
    var hovering = monitor.getItem();

    if (hovering.id !== target.id) {
      props.moveCard(hovering, target);
    }
  },

  drop: function(props) {
    props.drop();
    return props.card;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDropTarget: connect.dropTarget(),
    isDragging: monitor.isDragging()
  };
}

var CardIndexItem = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;

    var isDragging = this.props.isDragging;

    return connectDropTarget(connectDragSource(connectDropTarget(
      <li className="card-index-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
        { this.props.card.title }
      </li>
    )));
  }
});

var DragSourceDecorator = DragSource(ItemTypes.CARD, cardSource,
   function(connect, monitor) {
     return {
       connectDragSource: connect.dragSource(),
       isDragging: monitor.isDragging()
     };
 });

 var DropTargetDecorator = DropTarget(ItemTypes.CARD, cardTarget,
   function(connect) {
     return {
       connectDropTarget: connect.dropTarget()
     };
 });

module.exports = DropTargetDecorator(DragSourceDecorator(CardIndexItem));

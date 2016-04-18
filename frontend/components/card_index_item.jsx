var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../constants/dnd_constants');
var DropBin = require('./drop_bin');
var UIActions = require('../actions/ui_actions');

var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var cardSource = {
  beginDrag: function (props) {
    return props.card;
  },

  endDrag: function () {
    UIActions.collapseAll();
  }
};

var cardTarget = {
  hover: function (props, monitor, component) {
    var target = props.card;
    var hovering = monitor.getItem();

    if (hovering.id !== target.id) {
      props.moveCard(hovering, target);
    }
  },

  drop: function(props, monitor, component) {
    props.drop();
    return props.card;
  }
};

var CardIndexItem = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return { placeholder: false };
  },

  componentWillReceiveProps: function(newProps) {
    var card = this.props.card;
    if (newProps.isOver && newProps.dragged.id != card.id && newProps.dragged.list_id != card.list_id) {
      this.setState({ placeholder: true });
    } else {
      this.setState({ placeholder: false });
    }
  },

  toggleCardModal: function (e) {
    e.stopPropagation();
    UIActions.toggleCardModal(this.props.card);
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;

    var isDragging = this.props.isDragging;
    var showPlaceholder = this.state.placeholder;

    return connectDragSource(connectDropTarget(
      <div onClick={this.toggleCardModal}>
        <li className={"card-index-item"} style={{ opacity: isDragging ? 0.5 : 1}}>
          { this.props.card.title }
        </li>
      </div>
    ));
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
   function(connect, monitor) {
     return {
       connectDropTarget: connect.dropTarget(),
       dropped: monitor.getDropResult(),
       dragged: monitor.getItem(),
       isOver: monitor.isOver()
     };
 });

module.exports = DropTargetDecorator(DragSourceDecorator(CardIndexItem));

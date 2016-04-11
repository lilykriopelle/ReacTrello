var React = require('react');
var CardForm = require('./card_form.jsx');
var CardList = require('./card_list');

var PropTypes = React.PropTypes;
var ItemTypes = require('../constants/dnd_constants');
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var listSource = {
  beginDrag: function (props) {
    return props.list;
  }
};

var listTarget = {
  hover: function (props, monitor) {
    var target = props.list;
    var hovering = monitor.getItem();
    if (hovering.id !== target.id) {
      props.switchList(hovering, target);
    }
  },

  drop: function(props) {
    props.drop();
    return props.list;
  }
};



var List = React.createClass({

  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    switchList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {

    var list = this.props.list;
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;

    var isDragging = this.props.isDragging;

    return connectDropTarget(connectDragSource(
      <li className="list" style={{ opacity: isDragging ? 0.5 : 1 }}>
        <p>{ list.title }</p>
        <CardList list={list} cards={list.cards} />
        <CardForm listId={list.id}/>
      </li>
    ));
  }

});

var DragSourceDecorator = DragSource(ItemTypes.LIST, listSource,
   function(connect, monitor) {
     return {
       connectDragSource: connect.dragSource(),
       isDragging: monitor.isDragging()
     };
 });

 var DropTargetDecorator = DropTarget(ItemTypes.LIST, listTarget,
   function(connect) {
     return {
       connectDropTarget: connect.dropTarget()
     };
 });

module.exports = DropTargetDecorator(DragSourceDecorator(List));

// module.exports = List;

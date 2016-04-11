var React = require('react');

var ItemTypes = require('../constants/dnd_constants');
var DropTarget = require('react-dnd').DropTarget;

var UIActions = require('../actions/ui_actions');
var ApiUtil = require('../util/api_util');

var DropBinStore = require('../stores/drop_bin_store');

var binTarget = {
  hover: function (props, monitor, component) {
    var card = monitor.getItem();
    var id = props.list.id;
    if (id !== card.list_id) {
      UIActions.expandContainer(props.list.id, props.ord);
    }
  },

  drop: function (props, monitor, component) {
    var card = monitor.getItem();
    var id = props.list.id;
    if (id !== card.list_id) {
      UIActions.changeCardList(card.board_id, card, props.list.id, props.ord);
      ApiUtil.changeCardList(card.id, id);
    }
    UIActions.collapseAll();
  }
};

var DropBin = React.createClass({

  componentDidMount: function () {
    this.token = DropBinStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  onChange: function () {
    if (DropBinStore.list() == this.props.list.id && DropBinStore.ord() == this.props.ord) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  },

  getInitialState: function () {
    return { active: false };
  },

  render: function () {
    var className = "drop-bin";
    if (this.state.active) {
      className += " active";
    }
    var connectDropTarget = this.props.connectDropTarget;
    return connectDropTarget(<div className={className}></div>);
  }

});

var DropTargetDecorator = DropTarget(ItemTypes.CARD, binTarget,
  function(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
});

module.exports = DropTargetDecorator(DropBin);

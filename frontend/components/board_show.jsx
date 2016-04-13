var React = require('react');
var List = require('./list.jsx');
var ListForm = require('./list_form.jsx');
var BoardStore = require('../stores/board_store.js');
var ApiUtil = require('../util/api_util.js');

var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');

var BoardShow = React.createClass({

  getInitialState: function () {
    return { board: BoardStore.all()[parseInt(this.props.routeParams.id)] };
  },

  componentDidMount: function () {
    this.callbackToken = BoardStore.addListener(this._onChange);
    ApiUtil.fetchSingleBoard(this.props.routeParams.id);
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleBoard(parseInt(newProps.params.id));
  },

  componentWillUnmount: function () {
    this.callbackToken.remove();
  },

  _onChange: function () {
    this.setState({ board: BoardStore.all()[this.props.routeParams.id] });
  },

  compareLists: function(list1, list2){
    return list1.ord - list2.ord;
  },

  switchList: function(hovering, target) {
    var lists = this.state.board.lists;

    var list = lists.filter(function (l) {
      return l.id === hovering.id;
    })[0];

    var afterList = lists.filter(function (l) {
      return l.id === target.id;
    })[0];

    var listOrder = list.ord;
    list.ord = afterList.ord;
    afterList.ord = listOrder;

    lists.sort(this.compareLists);
    this.forceUpdate();
  },

  updateListOrder: function () {
    var boardId = this.props.params.id;
    ApiUtil.updateListOrder(boardId, this.state.board.lists);
  },

  render: function () {
    var board = this.state.board;
    var lists = "";
    if (board && board.lists) {
      lists = board.lists.map(function (list) {
        return <List
                  switchList={this.switchList}
                  key={list.id}
                  list={list}
                  drop={this.updateListOrder}/>;
      }.bind(this));
    }

    var listForm = "";
    if (this.state.board) {
      listForm = <ListForm boardId={this.state.board.id}/>;
    }

    return (
      <div className="board-show">
        <h3>{board ? board.title : ""}</h3>
        <div className="scroll-container">
          <ul className="list-list">
            {lists}
            {listForm}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = BoardShow;
module.exports = DragDropContext(HTML5Backend)(BoardShow);

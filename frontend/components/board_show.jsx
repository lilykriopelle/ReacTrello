var React = require('react');
var List = require('./list.jsx');
var ListForm = require('./list_form.jsx');
var BoardStore = require('../stores/board_store.js');
var ApiUtil = require('../util/api_util.js');

var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');

var BoardShow = React.createClass({

  getInitialState: function () {
    var board = BoardStore.all()[parseInt(this.props.routeParams.id)];
    return { board: board, editing: false, editedTitle: "" };
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
    var board = BoardStore.all()[parseInt(this.props.routeParams.id)];
    this.setState({ board: board, editedTitle: board.title });
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

  _toggleEditing: function () {
    this.setState({editing: !this.state.editing});
  },

  updateEditedTitle: function (e) {
    this.setState({editedTitle: e.currentTarget.value});
  },

  updateBoard: function (e) {
    e.preventDefault();
    var callback = function () {
      this.setState({editing: false});
    }.bind(this);
    ApiUtil.updateBoard({title: this.state.editedTitle, id: this.state.board.id}, callback);
  },

  renameForm: function () {
    var renameForm = "";
    if (this.state.editing) {
      renameForm = (
        <form className="new-board-form">
          <h1>Rename Board</h1>
          <input value={this.state.editedTitle} onChange={this.updateEditedTitle}/>
          <button onClick={this.updateBoard}>Rename</button>
        </form>
      );
    }
    return renameForm;
  },

  listForm: function () {
    var listForm = "";
    if (this.state.board) {
      listForm = <ListForm boardId={this.state.board.id}/>;
    }
    return listForm;
  },

  lists: function () {
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
    return lists;
  },

  render: function () {
    var board = this.state.board;

    return (
      <div className="board-show">
        <h3 onClick={this._toggleEditing}>{board ? board.title : ""}</h3>
        {this.renameForm()}
        <div className="scroll-container">
          <ul className="list-list">
            {this.lists()}
            {this.listForm()}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = BoardShow;
module.exports = DragDropContext(HTML5Backend)(BoardShow);

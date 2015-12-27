var React = require('react');
var List = require('./list.jsx');
var BoardStore = require('../stores/board_store.js');
var ApiUtil = require('../util/api_util.js');

var BoardShow = React.createClass({

  getInitialState: function () {
    return { board: BoardStore.all()[this.props.routeParams.id] };
  },

  componentDidMount: function () {
    this.callbackToken = BoardStore.addListener(this._onChange);
    ApiUtil.fetchSingleBoard(this.props.routeParams.id);
  },

  componentWillUnmount: function () {
    this.callbackToken.remove();
  },

  _onChange: function () {
    this.setState({ board: BoardStore.all()[this.props.routeParams.id] });
  },

  render: function () {
    var board = this.state.board;
    var lists = "";
    if (board && board.lists) {
      lists = board.lists.map(function (list) {
        return <List key={list.id} list={list} />;
      });
    }

    return (
      <div className="board-show">
        <ul className="group">
          {lists}
        </ul>
      </div>
    );
  }

});

module.exports = BoardShow;

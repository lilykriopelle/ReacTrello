var React = require('react');

var Board = React.createClass({
  render: function () {
    var board = this.props.board;
    return <li className="board board-list-item">
            <a href={"/boards/" + board.id}> { board.title } </a>
           </li>;
  }
});

module.exports = Board;

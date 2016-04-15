var React = require('react');
var ApiUtil = require('../util/api_util.js');
var enhanceWithClickOutside = require('react-click-outside');

var BoardForm = React.createClass({

  placeholders: [
    "Like 'Weekly Meal Planning', for example...",
    "Like 'Kitchen Renovation', for example...",
    "What are you planning?",
    "Like 'Vacation Itinerary', for example..."
  ],

  randomPlaceholder: function () {
    return this.placeholders[ Math.floor(Math.random() * this.placeholders.length) ];
  },

  getInitialState: function () {
    return { composing: false, title: "" };
  },

  _onChange: function (e) {
    this.setState({ title: e.currentTarget.value });
  },

  _startComposing: function () {
    this.setState({ composing: true });
  },

  _stopComposing: function (e) {
    e.preventDefault();
    this.setState({ composing: false, title: "" });
  },

  _submitBoard: function (e) {
    ApiUtil.createBoard({ title: this.state.title }, function () {
      this.setState(this.getInitialState());
    }.bind(this));
  },

  handleClickOutside: function () {
    this.setState(this.getInitialState());
  },

  render: function () {
    if (!this.state.composing) {
      return <button className="open-board-form"onClick={this._startComposing}>Create new board...</button>;
    } else {
      return (
        <form className="new-board-form" onSubmit={this._submitBoard}>
          <div className="close" onClick={this._stopComposing}><i className="fa fa-times"></i></div>
          <h1>Create Board</h1>
            <input
              type="text"
              onChange={this._onChange}
              value={this.state.title}
              placeholder={this.randomPlaceholder()}/>
          <button>Create</button>
        </form>
      );
    }
  }

});

module.exports = enhanceWithClickOutside(BoardForm);

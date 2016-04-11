var React = require('react');

var CardForm = React.createClass({

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
    e && e.preventDefault();
    this.setState({ composing: false, title: "" });
  },

  _submitCard: function (e) {
    e.preventDefault();
    ApiUtil.createCard({
      listId: this.props.listId,
      title: this.state.title
    }, this._stopComposing);
  },

  render: function () {
    if (!this.state.composing) {
      return <button className="open-form"onClick={this._startComposing}>Add a card...</button>;
    } else {
      return (
        <form className="new-card-form">
          <textarea value={this.state.title} onChange={this._onChange} />
          <div className="buttons group">
            <button className="add" onClick={this._submitCard}>Add</button>
            <button className="collapse" onClick={this._stopComposing}><i className="fa fa-times"></i></button>
          </div>
        </form>
      );
    }
  }

});

module.exports = CardForm;

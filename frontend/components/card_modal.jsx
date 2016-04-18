var React = require('react');
var Modal = require('react-modal');
var ModalStore = require('../stores/modal_store.js');
var UIActions = require('../actions/ui_actions');

$(function() {
  Modal.setAppElement(document.getElementById('modal'));
});

var customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(55, 55, 55, 0.6)',
    zIndex            : 200
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : 690,
    height                : 'calc(100% - 40px)',
    overflow              : 'scroll'
  }
};

var CardModal = React.createClass({

  getInitialState: function () {
    return {modalIsOpen: false, editingDescription: false, description: ""};
  },

  componentDidMount: function () {
    this.token = ModalStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  _onChange: function () {
    this.setState({modalIsOpen: ModalStore.cardModalExpanded()});
  },

  toggleEditDescription: function (e) {
    e && e.preventDefault();
    this.setState({editingDescription: !this.state.editingDescription});
  },

  updateDescription: function (e) {
    this.setState({description: e.currentTarget.value});
  },

  descriptionForm: function () {
    if (this.state.editingDescription) {
      return (
        <form>
          <textarea value={this.state.description} onChange={this.updateDescription}/>
          <button className="green-button">Save</button>
          <button className="close" onClick={this.toggleEditDescription}><i className="fa fa-times"></i></button>
        </form>
      );
    } else {
      var text;
      if (this.card().description === null) {
        text = "Edit the description...";
      } else {
        text = this.card().description;
      }
      return (
        <div className="description" onClick={this.toggleEditDescription}>
          {text}
        </div>
      );
    }
  },

  card: function () {
    return ModalStore.card();
  },

  modalContents: function () {
    var modalContents = "";
    if (this.card()) {
      modalContents = (
        <div className="modal-contents">
          <header>
            <h1 className="card-title">{this.card().title}</h1>
            <p>in list {this.card().list_title}</p>
          </header>
          <main>
            {this.descriptionForm()}
          </main>
        </div>
      );
    }
    return modalContents;
  },

  render: function () {
    return (
      <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles} >
        {this.modalContents()}
      </Modal>
    );
  }

});

module.exports = CardModal;

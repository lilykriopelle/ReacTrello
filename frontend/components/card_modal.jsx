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
    zIndex: 200
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var CardModal = React.createClass({

  getInitialState: function () {
    return {modalIsOpen: false};
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

  render: function () {
    var card = ModalStore.card();
    return (
      <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles} >

         {card && card.title}

       </Modal>
     );
  }

});

module.exports = CardModal;

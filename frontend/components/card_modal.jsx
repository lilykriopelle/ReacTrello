var React = require('react');
var Modal = require('react-modal');
var ModalStore = require('../stores/modal_store.js');
var UIActions = require('../actions/ui_actions');
var ApiUtil = require('../util/api_util.js');
var CommentForm = require('./comment_form.jsx');
var Comment = require('./comment.jsx');

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
    overflow              : 'scroll',
    background            : '#edeff0'
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
    var description;
    if (this.card()) {
      description = this.card().description;
    } else {
      description = "";
    }
    this.setState({modalIsOpen: ModalStore.cardModalExpanded(), description: description});
  },

  toggleEditDescription: function (e) {
    e && e.preventDefault();
    this.setState({editingDescription: !this.state.editingDescription});
  },

  updateDescription: function (e) {
    this.setState({description: e.currentTarget.value});
  },

  updateCard: function (e) {
    e.preventDefault();
    ApiUtil.updateCard({
      id: this.card().id,
      description: this.state.description
    }, function () {
      this.setState({editingDescription: false});
    }.bind(this));
  },

  descriptionForm: function () {
    if (this.state.editingDescription) {
      return (
        <form>
          <textarea value={this.state.description} onChange={this.updateDescription}/>
          <button className="green-button" onClick={this.updateCard}>Save</button>
          <button className="close" onClick={this.toggleEditDescription}><i className="fa fa-times"></i></button>
        </form>
      );
    } else {
      if (this.card().description === null || this.card().description === "") {
        return (
          <div className="edit-description" onClick={this.toggleEditDescription}>
            Edit the description...
          </div>
        );
      } else {
        return (
          <div className="description">
            <div className="quiet">Description <span className="edit-link" onClick={this.toggleEditDescription}>Edit</span></div>
            <p>{this.card().description}</p>
          </div>
        );
      }
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
            <CommentForm card={this.card()} board={this.props.board}/>
            {this.card().comments.map(function (comment) {
              return <Comment key={comment.id} comment={comment}/>;
            })}
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

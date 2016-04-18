var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ModalStore = new Store(AppDispatcher);
var UIConstants = require('../constants/ui_constants');

var _expanded = {
  cardModal: false
};

var _card;

ModalStore.cardModalExpanded = function () {
  return _expanded.cardModal;
};

ModalStore.card = function () {
  return _card;
};

ModalStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UIConstants.TOGGLE_CARD_MODAL:
      _expanded.cardModal = !_expanded.cardModal;
      _card = payload.card;
      ModalStore.__emitChange();
      break;
  }
};

module.exports = ModalStore;

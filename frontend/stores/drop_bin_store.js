var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var DropBinStore = new Store(AppDispatcher);
var UIConstants = require('../constants/ui_constants');

var _expanded = {};

DropBinStore.list = function () {
  return _expanded.listId;
};

DropBinStore.ord = function () {
  return _expanded.ord;
};

DropBinStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UIConstants.EXPAND_DROP_BIN:
      _expanded = { listId: payload.listId, ord: payload.dropBinOrd };
      DropBinStore.__emitChange();
      break;
    case UIConstants.RESET_BINS:
      _expanded = {};
      DropBinStore.__emitChange();
      break;
  }
};

module.exports = DropBinStore;

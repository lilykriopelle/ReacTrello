var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var DropdownStore = new Store(AppDispatcher);
var UIConstants = require('../constants/ui_constants');

var _expanded = {
  userDropdown: false,
  boardsDropdown: false
};

DropdownStore.userDropdownExpanded = function () {
  return _expanded.userDropdown;
};

DropdownStore.boardsDropdownExpanded = function () {
  return _expanded.boardsDropdown;
};

DropdownStore.collapseAll = function () {
  _expanded = {
    userDropdown: false,
    boardsDropdown: false
  };
},

DropdownStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UIConstants.TOGGLE_USER_DROPDOWN:
      _expanded.userDropdown = !_expanded.userDropdown;
      DropdownStore.__emitChange();
      break;
    case UIConstants.TOGGLE_BOARDS_DROPDOWN:
      _expanded.boardsDropdown = !_expanded.boardsDropdown;
      DropdownStore.__emitChange();
      break;
    case UIConstants.COLLAPSE_ALL_DROPDOWNS:
      DropdownStore.collapseAll();
      DropdownStore.__emitChange();
      break;
  }
};

module.exports = DropdownStore;

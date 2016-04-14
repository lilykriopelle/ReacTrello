var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CurrentUserStore = new Store(AppDispatcher);
var CurrentUserConstants = require('../constants/current_user_constants.js');

var _currentUser;

CurrentUserStore.currentUser = function () {
  return _currentUser;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CurrentUserConstants.CURRENT_USER_RECEIVED:
      _currentUser = payload.user;
      CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;

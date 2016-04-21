var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchResultsStore = new Store(AppDispatcher);
var SearchConstants = require('../constants/search_constants');

var _users = [];

SearchResultsStore.users = function () {
  return _users.slice();
};

SearchResultsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.USERS_RECEIVED:
      _users = payload.users;
      SearchResultsStore.__emitChange();
      break;
  }
};

module.exports = SearchResultsStore;

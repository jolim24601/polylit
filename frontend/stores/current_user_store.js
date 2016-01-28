var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    CurrentUserConstants = require('../constants/current_user_constants'),
    objectAssign = require('object-assign');

var CurrentUserStore = new Store(AppDispatcher);
var _currentUser = {};

module.exports = CurrentUserStore;

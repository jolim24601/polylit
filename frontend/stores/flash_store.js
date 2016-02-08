var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    FlashConstants = require('../constants/flash_constants');

var FlashStore = new Store(AppDispatcher),
    _errors = [];

FlashStore.all = function () {
  return _errors.slice();
};

function resetFlash(flash) {
  _errors = [];
  if (flash.status) {
    _errors = flash.responseJSON.errors.map(function (err) { return err; });
  }
}

FlashStore.__onDispatch = function (payload) {
  if (payload.actionType === FlashConstants.FLASH_RECEIVED) {
    resetFlash(payload.flash);
    FlashStore.__emitChange();
  }
};

module.exports = FlashStore;

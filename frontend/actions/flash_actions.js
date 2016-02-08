var FlashConstants = require('../constants/flash_constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  updateFlash: function (flash) {
    AppDispatcher.dispatch({
      actionType: FlashConstants.FLASH_RECEIVED,
      flash: flash
    });
  }
};

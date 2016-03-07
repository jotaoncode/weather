var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var weatherConstants = require('../constants/weather');

function emitChange() {
  MapStore.emit('change');
}

var MapStore = assign({}, EventEmitter.prototype, {
  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },
  /**
   * Gets a actual weather
   */
  getLocation: function () {
    return "This is the Location";
  }
});

function handleAction(action) {
  switch (action.type) {
    default:
    //nothing
  }
}

MapStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = MapStore;

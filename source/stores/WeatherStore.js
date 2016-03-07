var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var weatherConstants = require('../constants/weather');

function emitChange() {
  WeatherStore.emit('change');
}

var WeatherStore = assign({}, EventEmitter.prototype, {
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
  getWeather: function () {
    return "This is the weather";
  }
});

function handleAction(action) {
  switch (action.type) {
    default:
    //nothing
  }
}

WeatherStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = WeatherStore;

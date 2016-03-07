var AppDispatcher = require('../dispatcher/AppDispatcher');
var directorsContants = require('../constants/weather');

module.exports = {
  addWeatherLocation: function (weatherLocation) {
    var action = {
      type: directorsContants.WEATHER_LOCATION,
      weatherLocation: weatherLocation
    };

    AppDispatcher.dispatch(action);
  }
};

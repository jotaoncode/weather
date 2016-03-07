var React = require('react');
var ModalLocation = require('./ModalLocation.react');
var WeatherStore = require('../stores/WeatherStore.js');
var Map = require('./Map.react');

/**
 * Retrieve current directors
 */
function getWeather() {
  return {
    weather: WeatherStore.getWeather()
  };
}
var Application = React.createClass({
  componentDidMount: function() {
    var long, lat;
    window.google = {};
    window.initializeApplication = this.initializeApplication;
    WeatherStore.addChangeListener(this._onChange);
    this.getCurrentPosition(this.refs.modalLocation.setCurrentPosition);
    this.getCurrentPosition(this.refs.map.setCurrentPosition);
  },
  getInfoWindow: function () {
    return new google.maps.InfoWindow({map: map});
  },
  getCurrentPosition: function (cb) {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(function(results) {
        cb && cb(results);
      }, function() {
        handleLocationError(true, this.getInfoWindow(), map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, this.getInfoWindow(), map.getCenter());
    }
  },
  initializeApplication: function () {
    this.refs.map.initializeMap();
    this.refs.modalLocation.initializeModalLocation();
  },
  componentWillUnmount: function() {
    WeatherStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getWeather());
  },
  render: function () {
    var long, lat;
    try {
      long = window.parseFloat(this.props.params.long);
      lat = window.parseFloat(this.props.params.lat);
    } catch(e) {
      console.error("Params long and lat parse float error: ", e);
    }
    var showMap = _.isNumber(lat) && _.isNumber(long) && !isNaN(lat) && !isNaN(long);
    var showModal = !showMap;
    return (
      <div className="container-view">
        <Map ref="map"  coords={this.props.params} showMap={showMap}/>
        <ModalLocation ref="modalLocation" coords={this.props.params} showModal={showModal}/>
      </div>
    );
  }
});

module.exports = Application;

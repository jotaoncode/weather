var React = require('react');
var jq = require('jquery');
var classNames = require('classnames');

var Map = React.createClass({
  getInfoWindow: function () {
    return new google.maps.InfoWindow({map: map});
  },
  initializeMap: function () {
    window.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15
    });
  },
  setCurrentPosition: function (position) {
    _.defer(function () {
      google.maps.event.trigger(map, 'resize');
      var pos = {
        lat: window.parseFloat(position.coords.latitude),
        lng: window.parseFloat(position.coords.longitude)
      }, infoWindow;
      if (pos) {
        infoWindow = this.getInfoWindow();
        infoWindow.setPosition(pos);
        map.setCenter(pos);
        jq.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&appid=2451ee364d746b3fbd8f4a2f5950dc4c',
          success: function (tmp) {
            infoWindow.setContent('Temperature is: ' + tmp.main.temp + ' °F');
          },
          fail: function () {
            console.error(arguments);
          }
        })

      }
    }.bind(this));
  },
  getInitialState: function () {
    return {
      open: true,
      position: {}
    };
  },
  render: function () {
    var mapStyle = classNames({
      'hide-map': this.state.open && !this.props.showMap
    });
    if (this.props.coords && this.props.coords.lat && this.props.coords.long && window.google) {

      this.setCurrentPosition({ coords : {latitude: this.props.coords.lat, longitude: this.props.coords.long}});
    }
    return (
      <div id="map" className={mapStyle}></div>
    );
  }
});
module.exports = Map;

var React = require('react');
var classNames = require('classnames');
var Header = require('./Header.react');
var Paper = require('material-ui/lib/paper');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');

var Modal = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  initializeModalLocation: function () {
    var searchBox = new google.maps.places.Autocomplete(this.refs.searchBox),
    places, self = this,
    markers = [],
    bounds;
    searchBox.bindTo('bounds', map);
    searchBox.addListener('place_changed', function () {
      var place = searchBox.getPlace();
      self.setState(_.extend(self.state, {
        position: {
          lat: place.geometry.location.lat(),
          long: place.geometry.location.lng()
        }
      }));
    });
  },
  setCurrentPosition: function (position) {
    this.setState(_.extend(this.state, {
      currentPos: {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
    }));
  },
  getInitialState: function () {
    return {
      open: true,
      position: {},
      currentPos: {}
    };
  },
  goToSpecificLocation: function () {
    this.context.router.push('/lat/' + this.state.position.lat + '/long/' + this.state.position.long);
  },
  render: function () {
    var paperStyle = classNames({
      'show-paper': this.state.open && this.props.showModal,
      'hide-paper': !this.props.showModal
    });
    var currentPos = "#/lat/" + this.state.currentPos.lat + "/long/" + this.state.currentPos.long;
    return (
      <Paper zDepth={3} className={paperStyle}>
        <Header text="My Weather Application" />
        <div className="client-options">
          <label htmlFor="search-box">Select a location: </label>
          <input  className="search-box" autofocus name="search-box" type="text" placeholder="Search Box" ref="searchBox"/>
        </div>
        <div className="client-actions">
          <RaisedButton
            label="Your current Location"
            primary={true}
            linkButton={true}
            href={currentPos}
          />
          <RaisedButton
            label="Go to Location"
            secondary={true}
            ref="currentLocationButton"
            onClick={this.goToSpecificLocation}
          />
        </div>
      </Paper>
    );
  }
})

module.exports = Modal;

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';
import SearchBox from './components/SearchBox';

const { REACT_APP_GOOGLE_API_KEY } = process.env;
const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <div>
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 37.7749295, lng: -122.4194155 }}
    >
      {props.markers}
    </GoogleMap>
  </div>
));

class MapContainer extends Component {

  state = {
    markers : []
  };

  static defaultProps = {
    center: {lat: 37.7749295, lng: -122.4194155},
    zoom: 13
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value.toLowerCase() });
  };

  handleClick = () => {
    console.log(`Got input: ${this.state.input}`);

    fetch(`http://localhost:3001/locations?title=${this.state.input}`, {
      cache: 'no-store',
      credentials: 'omit'
    }).then((result) => {

      return result.json().then((data) => {
        let retrievedLocations = data.Locations;

        this.setState({
          markers: retrievedLocations
        });
      });

    });
  };

  render() {

    let markers = null;

    markers = (
      <div>
        {
          this.state.markers.map((location) => {
            return <Marker
              position={location.location}
              label= {location.name}
            />
          })
        }
      </div>
    );

    return (

      <div>
        <SearchBox 
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />

        <MapComponent
          googleMapURL= { googleMapsUrl }
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={ markers }
        />

      </div>
    );

  }
}

export default MapContainer;
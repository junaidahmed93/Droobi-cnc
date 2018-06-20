/* global google */
import React from 'react';
import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

const BookingMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCObVgS0QEFVLXSUwCNKpB8NuLmyKeWqc4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 25.068492, lng: 55.232519,
        },
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: _.debounce(
          () => {
            this.setState({
              bounds: refs.map.getBounds(),
              center: refs.map.getCenter(),
            });
          },
          100,
          { maxWait: 500 },
        ),
        onSearchBoxMounted: (ref) => {
          console.log('onSearchBoxMounter', ref);
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          console.log('refs', refs);
          const places = refs.searchBox.getPlaces();
          console.log('places', places);
          const bounds = new google.maps.LatLngBounds();
          console.log('bounds', bounds);
          console.log('bounds[0].geometry.viewport', places[0].geometry.viewport);
          console.log('bounds[0].geometry.location', places[0].geometry.location);
          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          console.log('nextCenter Lat', nextCenter.lat());
          console.log('nextCenter Long', nextCenter.lat());
          console.log('nextMarkers', nextMarkers);
          // refs.map.fitBounds(bounds);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  if (props && props.markers && props.markers[0]) {
    props.setValue('pickupLat', (props.markers[0].position.lat()).toString());
    props.setValue('pickupLong', (props.markers[0].position.lng()).toString());
  }

  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={10}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customer's Near landmark"
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '240px',
            height: '32px',
            marginTop: '27px',
            padding: '0 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
          }}
        />
      </SearchBox>
      {/* {props.markers.map((marker, index) => */}
      {props && props.markers && props.markers[0] ? <Marker position={props.markers[0].position} /> : null}

      {/* )} */}

    </GoogleMap>
  );
});

export default BookingMap;

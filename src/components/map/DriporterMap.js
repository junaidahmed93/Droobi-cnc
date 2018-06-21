/* global google */
import React from 'react';
import _ from 'lodash';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import driInActiveImage from '../../assets/images/ic_vehicle.svg';
import driActiveImage from '../../assets/images/ic_vehicleActive.svg';
import statusMapping from '../../utils/StatusMapping';
import ambulanceImg from '../../assets/images/ambulance.png';
import AmbulanceSVG from '../../assets/images/ambulanceRed.svg';
import AmbulanceEmpty from '../../assets/images/ambulanceEmpty.svg';

const DriporterMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCObVgS0QEFVLXSUwCNKpB8NuLmyKeWqc4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '450px' }} />,
    containerElement: <div style={{ height: '350px' }} />,
    mapElement: <div style={{ height: '350px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 25.2845344, lng: 51.5191851,
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
          // console.log('onSearchBoxMounter', ref);
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
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
        },
      });
    },
  }),
  withStateHandlers(() => ({
    isOpen: false,
    id: 0,
  }), {
      onToggleOpen: ({ isOpen }) => index => ({
        isOpen: !isOpen,
        id: index,
      }),
    }),
  withScriptjs,
  withGoogleMap,
)(props =>
  // console.log('props-----------------', props);

  (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={13}
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
          placeholder="Near landmark"
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

      {/* <Marker
        position={{ lat: 25.2845344, lng: 51.5191851 }}
        onClick={() => props.onToggleOpen()}
        icon={ambulanceImg}
      />

      <Marker
        position={{ lat: 25.287607, lng: 51.5229443 }}
        onClick={() => props.onToggleOpen()}
        icon={ambulanceImg}
      />

      <Marker
        position={{ lat: 25.279877, lng: 51.5327023 }}
        onClick={() => props.onToggleOpen()}
        icon={ambulanceImg}
      />

      <Marker
        position={{ lat: 25.276869, lng: 51.5260033 }}
        onClick={() => props.onToggleOpen()}
        icon={ambulanceImg}
      /> */}
      {props && props.ambulanceData ? props.ambulanceData.map((data, index) => (
        <Marker
          position={data.location}
          onClick={() => props.onToggleOpen(data.userId)}
          icon={data.info.status === 'job' ? AmbulanceSVG : AmbulanceEmpty}
        >
          {props.id === data.userId ? (
            props.isOpen &&
            <InfoBox
              onCloseClick={props.onToggleOpen}
              options={{ closeBoxURL: '', enableEventPropagation: true }}
            >
              <div onClick={() => {
                if (data.info.status === 'available') {
                  props.showPatients();
                }
                if (data.info.status === 'job') {
                  props.showPatientInAmbulance();
                }
                
              }} style={{ backgroundColor: '#C0ECAE', opacity: 0.75, padding: '12px' }}>
                <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
                  {data.info.number} <br />
                  {statusMapping(data.info.status)}

                </div>
              </div>
            </InfoBox>
          ) : null}

        </Marker>
      )) : null}
    </GoogleMap>
  ));

export default DriporterMap;

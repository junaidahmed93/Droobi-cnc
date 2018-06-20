import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import BookingCharts from '../../components/booking/BookingCharts';
import GlobalStyle from '../utils/Styles';
import * as actions from '../actions/IncomingPatientAction';
import IncomingPatient from '../components/booking/IncomingPatient';
import DriporterMap from '../components/map/DriporterMap';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../utils/Pagination';
import { patientData } from '../utils/data';

const style = {
  width: '98%',
  height: '100%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '0.5rem 1rem',
  padding: '5px',
};

class AmbulanceContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      currentRowCount: 10,
      startSearch: false,
      open: false,
      showSearchbar: false,
      showFilterBar: false,
      showTagBar: false,
      value: 1,
      filteredValues: ['1', '2', '3', '4', '5'],
      selectedValue: '',
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.currentPageNumber = -1;
    this.interval = () => { };
  }


  componentDidMount() {

  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      // shownRecords: nextProps.bookings,
      // storedRecords: nextProps.bookings,
    });

    setTimeout(() => {
      let endCount;
      let startCount;
      if (this.currentPageNumber > 0) {
        console.log('IF');
        startCount = this.currentPageNumber;
        endCount = startCount + 10;
      } else {
        console.log('Else');
        startCount = 0;
        endCount = this.state.currentRowCount;
      }
      this.setState({
        shownRecords: nextProps.bookings.slice(startCount, endCount),
        storedRecords: nextProps.bookings,
      });
    }, 1);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSearchChanged(object, value) {
    this.searchedRecords = [];
    if (value === '') {
      this.refreshBooking();
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      console.log('CLEAR INTERVAL');
      clearInterval(this.interval);
      this.state.storedRecords.forEach((item) => {
        if (item.userName.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.searchedRecords.push(item);
        }
      });
      this.startingNextCount = 0;
      this.setState({ shownRecords: this.searchedRecords, startSearch: true });
    }
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handlerSearch = () => {
    this.setState({ showSearchbar: true, showFilterBar: false, showTagBar: false });
  }

  handlerFilter = () => {
    this.setState({ showSearchbar: false, showFilterBar: true, showTagBar: false });
  }

  handlerTag = () => {
    this.setState({ showSearchbar: false, showFilterBar: false, showTagBar: true });
  }

  refreshBooking() {
    this.interval = setInterval(() => {
      console.log('startingNextCount', this.startingNextCount);
      this.currentPageNumber = this.startingNextCount;
      // this.props.actions.getAllBookings();
    }, 10000);
  }

  nextButton() {
    const nextRecords = nextBookings(this.state, this.startingNextCount);
    if (nextRecords) {
      this.startingNextCount = nextRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(nextRecords, nextRecords + 10) });
    }
  }

  previousButton() {
    const previousRecords = previousBookings(this.state, this.startingNextCount);
    if (!(previousRecords < 0)) {
      this.startingNextCount = previousRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(previousRecords, previousRecords + 10) });
    }
  }

  handleChange = (event, index, values) => this.setState({ values });


  render() {
    const { values, selectedValue, filteredValues } = this.state;
    return (
      <div >

        <DriporterMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100% !important' }} />}
          containerElement={<div style={{ height: '10vh !important' }} />}
          mapElement={<div style={{ height: '10vh !important' }} />}
          driporterLocations={this.props.driporterLocations}
        />


      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    bookings: state.IncomingPatientReducer.incomingPatient,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbulanceContainer);

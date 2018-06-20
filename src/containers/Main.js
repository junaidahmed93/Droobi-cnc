import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { Link } from 'react-router';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
// import BookingCharts from '../../components/booking/BookingCharts';
import GlobalStyle from '../utils/Styles';
import SelectField from 'material-ui/SelectField';
import * as actions from '../actions/IncomingPatientAction';
import IncomingPatient from '../components/booking/IncomingPatient';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../utils/Pagination';
import { patientData } from '../utils/data';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Map from '../components/map/DriporterMap';
import Ambulance from '../assets/images/ambulance.png';

const shortSheets = {
  width: '41%',
  height: '400px',
  textAlign: 'center',
  display: 'inline-block',
  margin: '1rem 1rem',
};

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      currentRowCount: 10,
      selectedindex: 0,
      startSearch: false,
      open: false,
      openDialoge: false,
      openUpcomingDialoge: false,
      showSearchbar: false,
      showFilterBar: false,
      showTagBar: false,
      value: '',
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      filteredValues: ['1', '2', '3', '4', '5'],
      selectedValue: '',
      ambulanceData: [
        {
          userId: 1,
          location: {
            lat: 25.287607, lng: 51.5229443,
          },
          info: {
            number: 'PEL - 01921',
            status: 'job',
          },
        },
        {
          userId: 2,
          location: {
            lat: 25.2845344, lng: 51.5191851,
          },
          info: {
            number: 'Q0L - 50120',
            status: 'available',
          },
        },
        {
          userId: 3,
          location: {
            lat: 25.279877, lng: 51.5327023,
          },
          info: {
            number: 'PPK - A8795',
            status: 'available',
          },
        },
        {
          userId: 4,
          location: {
            lat: 25.276869, lng: 51.5260033,
          },
          info: {
            number: 'EEQ - 00125',
            status: 'job'
          },
        },

      ],
      local: ['68', '110', '105'],
      local2: ['68', '110', '105'],
      values: [
        'AEL - 012 at Shah Faisal',
        'PB0 - 8797 at University road',
        'EEP - 0971 at Tariq road',
      ],
      upcomingRequest: [
        { id: 1, name: 'Faizan', disease: 'Heart', heartRate: '77', location: 'PIDC', requestTime: new Date().toString().slice(16, 24), elaspedTime: '2 min' },
        { id: 2, name: 'Javed', disease: 'Heat stoke', heartRate: '77', location: 'DHA', requestTime: new Date().toString().slice(16, 24), elaspedTime: '2 min' },
        { id: 3, name: 'Haris', disease: 'Kidney pain', heartRate: '77', location: 'Shah Faisal', requestTime: new Date().toString().slice(16, 24), elaspedTime: '2 min' },

      ]
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.currentPageNumber = -1;
    this.interval = () => { };
    this.interval2 = () => { };
  }


  componentDidMount() {
    this.props.actions.getAllIncomingPatients();
    this.interval = setInterval(() => {
      this.props.actions.getAllIncomingPatients();
    }, 1000);

    this.interval2 = setInterval(() => {
      let a = [];
      for (let i = 0; i < this.state.local.length; i++) {
        const random = Math.floor((Math.random() * 100) / 10);
        a[i] = Number(this.state.local2[i]) + random;
      }

      this.setState({ local: a });
    }, 1000);
    // this.refreshBooking();
    // this.setState({shownRecords: patientData });
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

  viewOpsDetail = (i) => {
    // alert(i)
    this.setState({ openDialoge: true, selectedindex: i });
  }

  onClickDialoge = () => {
    this.setState({ openDialoge: false, openUpcomingDialoge: false });
  }

  assignAmbulance = () => {
    const {upcomingRequest,ambulanceData} = this.state;
    this.state.upcomingRequest.splice(this.state.selectedIndex, 1);
    for(let j=0; j<ambulanceData.length; j++) {
      if(ambulanceData[j].info.status === 'available') {
        let obj1 = ambulanceData;
        obj1[j].info.status = 'job';

       
        this.setState({ambulanceData:obj1});
        break;
      }
    }
    this.setState({ openDialoge: false, openUpcomingDialoge: false });
  }

  onChange = (object, index, value) => {

    this.setState({
      value,
    });
  };

  showPatients = () => {
    this.setState({ openUpcomingDialoge: true });
  }

  render() {

    const actionsButton = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onClick={() => { this.onClickDialoge(); }}
      />,
    ];

    const actionsButtonForUpcoming = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onClick={() => { this.onClickDialoge(); }}
      />,
    ];
    const { selectedValue, filteredValues, openUpcomingDialoge, errorText, errorClass, ambulanceData, openDialoge, value, values, upcomingRequest } = this.state;
    const rows = upcomingRequest.map((data, i) => (
      <TableRow >
        <TableRowColumn>{data.name}</TableRowColumn>
        <TableRowColumn>{data.disease}</TableRowColumn>
        <TableRowColumn><span style={{ fontSize: '18px' }}>{this.state.local[i]}</span> bpm  </TableRowColumn>
        <TableRowColumn>{data.location}</TableRowColumn>
        <TableRowColumn>{data.requestTime}</TableRowColumn>
        <TableRowColumn>{data.elaspedTime}</TableRowColumn>
        <TableRowColumn >
          <img src={Ambulance} onClick={() => this.viewOpsDetail(i)} />
          {/* <AccountBox onClick={() => this.viewOpsDetail()} /> */}
        </TableRowColumn>
      </TableRow>
    ))
    return (
      <div id="vehicleContainer">
        {/* <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid>
            <Row>
              <Col md={3} />
              <Col md={7}>
                <h1>Droobi Command & Control</h1>
              </Col>
              <Col md={2} />
            </Row>
          </Grid>
        </Paper> */}

        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          Upcoming Request
          <Table onRowSelection={this.handleRowSelection}  >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Disease</TableHeaderColumn>
                <TableHeaderColumn>Heart Rate</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
                <TableHeaderColumn>Request Time</TableHeaderColumn>
                <TableHeaderColumn>Elapsed Time</TableHeaderColumn>
                <TableHeaderColumn>Assign</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {rows}
            </TableBody>
          </Table>
        </Paper>

        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Map ambulanceData={ambulanceData} showPatients={this.showPatients} />
        </Paper>
        <Dialog
          title="Assigning Ambulance"
          actions={actionsButton}
          modal={false}
          open={openDialoge}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div>

            <Grid>
              <Row>
                Suggested Ambulance
              </Row>
              <Row>
                <Col md={8}>AEL- 091 at street 1 DHA 5</Col>
                <Col md={4}>
                  <FlatButton
                    label="Assign"
                    primary
                    onClick={this.assignAmbulance}
                  />
                </Col>
              </Row>
              <Row>
                <br />
              </Row>
              <Row>
                Assign Manually
              </Row>
              <Row>
                <Col md={8}>
                  <SelectField
                    className="SelectField"
                    style={{ width: '90%', paddingLeft: this.props.extraPadding }}
                    errorText={errorText}
                    floatingLabelText='Select Ambulance'
                    value={value}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid #D3D3D3' }}
                  >
                    {values.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
                  </SelectField>
                </Col>
                <Col md={4}>
                  <FlatButton
                    label="Assign"
                    primary
                    onClick={this.assignAmbulance}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </Dialog>

        <Dialog
          title="Upcoming requests"
          actions={actionsButtonForUpcoming}
          modal={false}
          open={openUpcomingDialoge}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div>

            <Grid>

              <Row>
                <br />
              </Row>
              <Row>
                Assign Manually
              </Row>
              <Row>
                <Col md={8}>
                  <SelectField
                    className="SelectField"
                    style={{ width: '90%', paddingLeft: this.props.extraPadding }}
                    errorText={errorText}
                    floatingLabelText='Select Patient'
                    value={value}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid #D3D3D3' }}
                  >
                    {upcomingRequest.map(v => <MenuItem value={v} primaryText={v.name} key={v} />)}
                  </SelectField>
                </Col>
                <Col md={4}>
                  <FlatButton
                    label="Assign"
                    primary
                    onClick={this.assignAmbulance}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

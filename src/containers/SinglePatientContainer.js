import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { store } from '../store';
import { formsValidation } from '../utils/Helpers';
import GlobalStyle from '../utils/Styles';
import SinglePatientDetail from '../components/SinglePatientDetail';
import { LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class PatientContainer extends React.Component {
  constructor(props) {
    super(props);
    this.bookingData = {};
    this.onChangeCancelField = this.onChangeCancelField.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.deleteBookingConfirm = this.deleteBookingConfirm.bind(this);
    this.onChangeCancelField = this.onChangeCancelField.bind(this);
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      booking: {},
      cancelReasons: [],
      editMode: true,
      cancelBooking: false,
      cancelReason: '',
      cancelBookingError: '',
      value: 1,
      assigned: false,
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value, assigned: false });
  }

  componentDidMount() {
    let editableBooking;
    const bookings = store.getState().IncomingPatientReducer.incomingPatient;
    const paramId = Number(this.props.routeParams.id);
    bookings.forEach((element) => {
      if (element.id === paramId) {
        editableBooking = element;
      }
    });
    this.setState({ booking: editableBooking });
  }


  onEdit() {
    this.setState({ editMode: false });
  }

  onChangeCancelField(object, index, value) {
    console.log('----------------------value', value);
    this.setState({ cancelReason: value, cancelBookingError: '' });
  }

  setValue = (key, value) => {
    this.bookingData[key] = value;
  };

  cancelBooking() {
    this.setState({ showErrorTemplate: true, cancelBooking: true });
  }

  assignDr = () => {
    this.setState({ assigned: true });
  }

  submit = () => {
    const updateBooking = Object.assign({}, this.state.booking, this.bookingData);
    console.log('this.updatedPartnerUser', updateBooking);
    const fieldResult = formsValidation(updateBooking, 'EditBooking');
    if (fieldResult.warning === false) {
      this.props.actions.editBooking(updateBooking);
    } else {
      this.setState({
        booking: updateBooking,
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
      });
    }
  }

  deleteBookingConfirm() {
    if (this.state.cancelReason) {
      const data = {
        bookingId: this.state.booking.bookingId,
        actionType: 'cancelled',
        cancelReason: this.state.cancelReason,
      };
      console.log('data', data);
      this.props.actions.cancelBooking(data);
      this.setState({ showErrorTemplate: false, cancelBooking: false });
    } else {
      this.setState({ cancelBookingError: 'Please specify reason.' });
    }
  }

  render() {
    const data = [
      { name: '10', uv: 4000, pv: 9000 },
      { name: '20', uv: 3000, pv: 7222 },
      { name: '30', uv: 2000, pv: 6222 },
      { name: '40', uv: 1223, pv: 5400 },
      { name: '50', uv: 1890, pv: 3200 },
      { name: '60', uv: 2390, pv: 2500 },
      { name: '70', uv: 3490, pv: 1209 },
    ];

    const actionsButton = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={() => { this.setState({ showErrorTemplate: false }); }}
      />,
    ];

    const canceBookingActions = [
      <FlatButton
        label="No"
        primary
        onClick={() => { this.setState({ showErrorTemplate: false }); }}
      />,
      <FlatButton
        label="Yes"
        primary
        onClick={this.deleteBookingConfirm}
      />,
    ];
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>

          <LineChart
            width={1200}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
 top: 10, right: 30, left: 0, bottom: 0,
}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </LineChart>


        </Paper>
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid>
            <Row>
              <Col md={5}>
                <h2 style={GlobalStyle.formHeadingsh1}>Patient Details: <span style={{ color: '#27BCBD' }} /></h2>
              </Col>
              <Col md={7}>
                {/* <Link to="">
                  <FlatButton onClick={this.assignDr} label={this.state.assigned === true ? 'Assigned' : 'Assign Doctor'} className="add-button-on-header float-right" />
                </Link> */}

                <div style={{ display: 'inline-block' }}>
                  <Row>
                    <Col md={4} >
                      <SelectField
                        floatingLabelText="List of Doctors"
                        className="search-text-field"
                        value={this.state.value}
                        onChange={this.handleChange}
                      >
                        <MenuItem value={1} primaryText="Dr. Arshaad" />
                        <MenuItem value={2} primaryText="Dr. Hamid" />
                        <MenuItem value={3} primaryText="Dr. Sarim" />
                        <MenuItem value={4} primaryText="Dr. Subhan" />
                        <MenuItem value={5} primaryText="Dr. Danish" />
                      </SelectField>
                    </Col>
                    <Col md={1} />
                    <Col md={3} >
                      <SelectField
                        style={{ width: '200px' }}
                        floatingLabelText="Emg Department"
                        className="search-text-field"
                        value={this.state.value}
                        onChange={this.handleChange}
                      >
                        <MenuItem value={1} primaryText="ER-1" />
                        <MenuItem value={2} primaryText="ER-2" />
                        <MenuItem value={3} primaryText="ER-3" />
                        <MenuItem value={4} primaryText="ER-4" />
                        <MenuItem value={5} primaryText="ER-5" />
                      </SelectField>
                    </Col>
                    <Col md={1} />
                    <Col md={3}>
                      <FlatButton onClick={this.assignDr} label={this.state.assigned === true ? 'Assigned' : 'Assign Docter'} className="add-button-on-header float-right" />
                    </Col>
                  </Row>
                </div>


              </Col>
            </Row>
          </Grid>
          <SinglePatientDetail incomingPatient={this.state.booking} setValue={this.setValue} buttonHide={this.buttonHide} editMode={this.state.editMode} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={8} md={4}>
              <Link to="/home/admin/main">
                <FlatButton label="Back" className="add-button add-button-back float-right" />
              </Link>

            </Col>
          </Row>
        </Grid>

        <Dialog
          title={this.state.cancelBooking ? 'Cancel Booking' : 'Required'}
          actions={this.state.cancelBooking ? canceBookingActions : actionsButton}
          modal={false}
          open={this.state.showErrorTemplate}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {this.state.cancelBooking ?
            <div className={this.state.errorClass} >
              <h3>Are you sure to cancel booking </h3>
              <SelectField
                maxHeight={250}
                errorText={this.state.cancelBookingError}
                floatingLabelText="Select reason"
                value={this.state.cancelReason}
                onChange={this.onChangeCancelField}
                style={{ marginTop: '-15px' }}
              >
                {this.state.cancelReasons.map(v => <MenuItem value={v.reason} primaryText={v.reason} key={v.id} />)}

              </SelectField>
            </div>
            : <div className={this.state.errorClass} dangerouslySetInnerHTML={{ __html: this.state.errorText }} />}


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
    // actions: bindActionCreators("actions", dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer);

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
import { store } from '../../store';
import { formsValidation } from '../../utils/Helpers';
import GlobalStyle from '../../utils/Styles';
import * as actions from '../../actions/bookingActions';
import BookingEditForm from '../../components/booking/bookingEditForm';

class EditBookingContainer extends React.Component {
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

    };
  }


  componentDidMount() {
    let editableBooking;
    const bookings = store.getState().bookingReducer.bookings;
    const cancelReasons = store.getState().CommonReducer.bookingCancelReasonList;
    const paramId = Number(this.props.routeParams.id);
    bookings.forEach((element) => {
      if (element.id === paramId) {
        editableBooking = element;
      }
    });
    console.log('-----------------------------------', cancelReasons);
    this.setState({ booking: editableBooking, cancelReasons: cancelReasons.data.bookingCancelReasons });
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
          <BookingEditForm booking={this.state.booking} setValue={this.setValue} buttonHide={this.buttonHide} editMode={this.state.editMode} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={8} md={4}>
              <Link to="/home/admin/bookings">
                <FlatButton label="Back" className="add-button add-button-back float-right" />
              </Link>
              {!(this.state.booking.status === 'cancelled' || this.state.booking.status === 'completed') ?
                <div>
                  <FlatButton label="Cancel Booking" onClick={this.cancelBooking} className="cancel-booking-button float-right" />
                  {this.state.editMode ?
                    <FlatButton label="Edit" onClick={this.onEdit} className="add-button float-right" />
                    : <FlatButton label="Save" onClick={this.submit} disabled={this.state.buttonDisable} className="add-button float-right" />}

                </div>
                : null}
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
    bookings: state.bookingReducer.bookings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBookingContainer);

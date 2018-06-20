import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Converters from '../../utils/Converters';
import InputEditBox from '../shared/forms/InputEditBox';
import { getAirportFromDeptLoc, getTerminalFromDeptLoc } from '../../utils/Helpers';
import GlobalStyle from '../../utils/Styles';
import statusMapping from '../../utils/StatusMapping';

export default class BookingEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: {},
    };
  }

  render() {
    const { booking, setValue, editMode } = this.props;
    return (
      <form className="form-validation">
        <h2 style={GlobalStyle.formHeadingsh1}>Booking Details: <span style={{ color: '#27BCBD' }}>{booking.referenceId}</span></h2>
        <h4 className="paper-title"> Status: <span className="Hotel-booking-status">{statusMapping(booking.status)}</span>  </h4>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="guestName"
                setValue={setValue}
                prefilled={booking.name}
                label="Guest Name"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="contactNumber"
                hintText="+971234578900"
                setValue={setValue}
                prefilled={booking.phoneNumber}
                label="Contact Number"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="emailAddress"
                setValue={setValue}
                prefilled={booking.email}
                label="Email Address"
                type="email"
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="nationality"
                setValue={setValue}
                prefilled={booking.country}
                label="Nationality"
                type="text"
                disabled
              />
            </Col>

          </Row>

        </Grid>

        <h2 className="paper-title heading-spacing">Flight Details</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="flightNumber"
                setValue={setValue}
                prefilled={booking.flightNumber}
                label="Flight Number"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="flightDate"
                setValue={setValue}
                prefilled={Converters.dateConverter(booking.flightDepartureTime)}
                label="Flight Date"
                type="date"
                fixedFloat
                disabled
              />
            </Col>
            <Col md={4}>
              {/* <BookingEditTimePicker
                                id="flightTime"
                                setValue={setValue}
                                prefilled={booking.newTime}
                                label="Flight Time"
                                disabled={true}
                            /> */}

              <InputEditBox
                id="flightTime"
                setValue={setValue}
                prefilled={Converters.timeConverter(booking.flightDepartureTime)}
                label="Flight Time"
                type="time"
                fixedFloat
                disabled
              />
            </Col>
          </Row>
        </Grid>

        <h2 className="paper-title heading-spacing">Pickup Luggage Information</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="pickupDate"
                setValue={setValue}
                prefilled={Converters.dateConverter(booking.requestedPickupTime)}
                label="Pickup Date"
                type="date"
                fixedFloat
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="pickupTime"
                setValue={setValue}
                prefilled={Converters.timeConverter(booking.requestedPickupTime)}
                label="Pickup Time"
                type="time"
                fixedFloat
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="numberOfBags"
                setValue={setValue}
                prefilled={Number(booking.numberOfBags)}
                label="Luggages"
                type="number"
                disabled={editMode}
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="numberOfCompanions"
                setValue={setValue}
                prefilled={Number(booking.numberOfCompanions)}
                label="Number of Companions"
                type="number"
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="description"
                setValue={setValue}
                prefilled={booking.description}
                label="Description"
                type="text"
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="commentsForDriporter"
                setValue={setValue}
                prefilled={booking.commentsForDriporter}
                label="Comments for Driporter"
                type="text"
                disabled
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            {/* <Col md={4}>
                            <InputEditBox
                                id="flatOfficeNumber"
                                setValue={setValue}
                                prefilled={booking.flatOfficeNumber}
                                label="Flat / Office #"
                                type="text"
                                disabled={true}
                            />
                        </Col>
                        <Col md={4}>
                            <InputEditBox
                                id="floorNumber"
                                setValue={setValue}
                                prefilled={booking.floorNumber}
                                label="Floor No."
                                type="text"
                                disabled={true}
                            />
                        </Col> */}
            <Col md={4}>
              <InputEditBox
                id="pickupAddress"
                setValue={setValue}
                prefilled={`${booking.completeAddress}`}
                label="Address"
                type="text"
                multiLine="true"
                rows="2"
                rowsMax="4"
                disabled
              />
            </Col>
          </Row>

        </Grid>
        <br />
        <h2 className="paper-title heading-spacing">Dropoff Luggage Information</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="dropoffAirport"
                setValue={setValue}
                prefilled={getAirportFromDeptLoc(booking.departureLocationName)}
                label="Airport"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="dropoffTerminal"
                setValue={setValue}
                prefilled={getTerminalFromDeptLoc(booking.departureLocationName)}
                label="Terminal"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="dropoffDate"
                setValue={setValue}
                prefilled={Converters.dateConverter(booking.dropOffTime)}
                label="Date"
                type="date"
                fixedFloat
                disabled
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="dropoffTime"
                setValue={setValue}
                prefilled={Converters.timeConverter(booking.dropOffTime)}
                label="Time"
                type="time"
                fixedFloat
                disabled
              />
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Converters from '../utils/Converters';
import InputEditBox from './shared/forms/InputEditBox';
import { getAirportFromDeptLoc, getTerminalFromDeptLoc } from '../utils/Helpers';
import GlobalStyle from '../utils/Styles';
import statusMapping from '../utils/StatusMapping';
import LinearProgress from 'material-ui/LinearProgress';

export default class BookingEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: {},
      incomingPatient: {},
    };
    this.heartBeatInc = true;
    this.color = 'green';
  }

  componentDidMount() {
    setInterval(() => {
      this.refresh();
    }, 5000);
  }

  refresh() {
    const data = this.props.incomingPatient;
    const previousRate = this.state.incomingPatient.heartRate;
    const random = Math.floor((Math.random() * 100) / 10);
    const heartRate = (Number(data.heartRate) + (random));
    const finalDate = Object.assign({}, data, { heartRate });
    this.color = previousRate > heartRate ? 'green' : 'red';
    this.setState({ incomingPatient: finalDate });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ incomingPatient: nextProps.incomingPatient });
  }
  render() {
    const { setValue, editMode } = this.props;
    const { incomingPatient } = this.state;
    return (
      <form className="form-validation">
        {/* <h2 style={GlobalStyle.formHeadingsh1}>Patient Details: <span style={{ color: '#27BCBD' }}>{incomingPatient.name}</span></h2> */}

        <span style={{ color: '#29ABE2', fontSize: '15px' }}>Data Receiving from Ambulance...</span>
        <LinearProgress mode="indeterminate" />
        <Divider className="paper-divider" />
        <br />
        <Grid fluid>
          <Row>
            <Col md={6}>

              <Grid>
                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Name </Col>
                  <Col md={6}> {incomingPatient.name} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Age </Col>
                  <Col md={6}> {incomingPatient.age} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Gender </Col>
                  <Col md={6}> {incomingPatient.gender} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Weight </Col>
                  <Col md={6}> {incomingPatient.weight} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Height </Col>
                  <Col md={6}> {incomingPatient.height} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Blood Group </Col>
                  <Col md={6}> {incomingPatient.bloodGroup} </Col>
                </Row>
              </Grid>

            </Col>

            <Col md={6}>

              <Grid>
                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Previous Treament </Col>
                  <Col md={6}> Xyz medicines </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Operated </Col>
                  <Col md={6}> {incomingPatient.operated} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Heartrate </Col>
                  <Col md={6} style={{ color: `${this.color}` }}> {incomingPatient.heartRate} bpm </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Blood Pressure </Col>
                  <Col md={6}> {incomingPatient.bloodPressure} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Cholestrol </Col>
                  <Col md={6}> {incomingPatient.cholestrol} mg/dl </Col>
                </Row>


                <Row style={{ padding: '5px' }}>
                  <Col md={6}>blood sugar  </Col>
                  <Col md={6}> {incomingPatient.bloodSugar} mg/dl</Col>
                </Row>

              </Grid>
            </Col>
          </Row>
        </Grid>
        <br />
        <Divider className="paper-divider" />
        <br />
        <h2 style={GlobalStyle.formHeadingsh1}>First Aid </h2>
        <br />
        <Divider className="paper-divider" />

        <Grid fluid>
          <Row>
            <Col md={6}>

              <Grid>
                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Accident  </Col>
                  <Col md={6}> {incomingPatient.accident} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Natural cause </Col>
                  <Col md={6}> {incomingPatient.naturalCase} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Wound </Col>
                  <Col md={6}> {incomingPatient.wound} </Col>
                </Row>

                <Row style={{ padding: '5px' }}>
                  <Col md={6}> Comments </Col>
                  <Col md={6}> {incomingPatient.comments} </Col>
                </Row>

                {/* <Row style={{ padding: '5px' }}>
                                    <Col md={6}> Height </Col>
                                    <Col md={6}> {incomingPatient.height} </Col>
                                </Row>

                                <Row style={{ padding: '5px' }}>
                                    <Col md={6}> Blood Group </Col>
                                    <Col md={6}> {incomingPatient.bloodGroup} </Col>
                                </Row> */}
              </Grid>

            </Col>


          </Row>
        </Grid>

      </form>
    );
  }
}

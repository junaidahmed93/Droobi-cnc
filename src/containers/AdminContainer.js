import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

const adminMenus = [
  'Home',
  'Patient Activity',

];
class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,
      activeItem: 'HOME',
    };
  }


  getSideBarLinks = () => {
    const { activeItem } = this.state;
    const styles = {
      activeText: {
        color: '#0D5BD5',
        // fontWeight: "bold"
        fontSize: '12px',
      },
      nonActive: {
        color: '#7E7E7E',
        cursor: 'pointer',
        fontSize: '12px',
      },
    };
    return (
      <div>
        <MenuItem>
          <div
            className="sideOptions"
            onClick={() => { this.handleClick('home'); }}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24">
                <path fill="#0D5BD5" d="M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>HOME</span>
            </div>
          </div>
        </MenuItem>

        <MenuItem>
          <div
            className="sideOptions"
            onClick={() => { this.handleClick('dashboard'); }}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24">
                <path fill="#0D5BD5" d="M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>Dashboard</span>
            </div>
          </div>
        </MenuItem>

        {/* <MenuItem>
          <div
            className="sideOptions"
            onClick={() => { this.handleClick('history'); }}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24">
                <path fill="#0D5BD5" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>Patient History</span>
            </div>
          </div>
        </MenuItem> */}

        {/* <MenuItem>
          <div
            className="sideOptions"
            onClick={() => { this.handleClick('enroute'); }}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24">
                <path fill="#0D5BD5" d="M11,10H5L3,8L5,6H11V3L12,2L13,3V4H19L21,6L19,8H13V10H19L21,12L19,14H13V20A2,2 0 0,1 15,22H9A2,2 0 0,1 11,20V10Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>Patient Enroute</span>
            </div>
          </div>
        </MenuItem> */}

        {/* <MenuItem>
          <div
            className="sideOptions"
            onClick={() => { this.handleClick('ambulance'); }}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24">
                <path fill="#0D5BD5" d="M18,18.5A1.5,1.5 0 0,0 19.5,17A1.5,1.5 0 0,0 18,15.5A1.5,1.5 0 0,0 16.5,17A1.5,1.5 0 0,0 18,18.5M19.5,9.5H17V12H21.46L19.5,9.5M6,18.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 6,15.5A1.5,1.5 0 0,0 4.5,17A1.5,1.5 0 0,0 6,18.5M20,8L23,12V17H21A3,3 0 0,1 18,20A3,3 0 0,1 15,17H9A3,3 0 0,1 6,20A3,3 0 0,1 3,17H1V6C1,4.89 1.89,4 3,4H17V8H20M8,6V9H5V11H8V14H10V11H13V9H10V6H8Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>Ambulances</span>
            </div>
          </div>
        </MenuItem> */}

        {/* <MenuItem>
          <div
            className="sideOptions"
            onClick={() => { this.handleClick('main'); }}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24">
                <path fill="#0D5BD5" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>configuration </span>
            </div>
          </div>
        </MenuItem> */}
      </div>
    );
  };

  handleClick(e, a) {
    console.log('eeeeeeeeeeeeee', e);
    if (e === 'home') {
      browserHistory.push('/home/admin/main');
    }
    if (e === 'dashboard') {
      browserHistory.push('/home/admin/dashboard');
    }
    if (e === 'history') {
      browserHistory.push('/home/admin/patient-history');
    }

    if (e === 'enroute') {
      browserHistory.push('/home/admin/patient-enroute');
    }
    if (e === 'ambulance') {
      browserHistory.push('/home/admin/ambulance');
    }
    if (e === 'config') {
      browserHistory.push('/home/admin/config');
    }
  }


  render() {
    return (
      <div>
        <Grid fluid className="gridMain" style={{ padding: 0, paddingLeft: 2 }}>
          <Row style={{
            height: 'inherit',
            // overflow: 'hidden'
          }}
          >
            <Col xs={3} sm={2} md={2} lg={1} style={{ padding: 0 }} className="sideMenus">
              <Paper className="sideMenusPaper" style={{ width: 'inherit', overflowY: 'scroll', height: '100%' }} open>
                {this.getSideBarLinks()}
              </Paper>
            </Col>
            <Col style={{ overflowY: 'scroll', padding: 3 }} xs={9} sm={10} md={10} lg={11} className="rightSideItems">
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AdminComponent;

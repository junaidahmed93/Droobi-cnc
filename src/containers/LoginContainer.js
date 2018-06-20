import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as actions from '../actions/loginActions';
import * as forgetPasswordActions from '../actions/ForgetPasswordActions';
import Login from '../components/Login';
import ForgetPassword from '../components/login/ForgetPassword';
import LoaderIndicator from '../components/loader';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.enableForgetDialog = this.enableForgetDialog.bind(this);
    this.disableForgetDialog = this.disableForgetDialog.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
    this.state = {
      openSnackBar: false,
      errorMessage: '',
      passwordReset: false,
      codeSent: false,
      codeVerified: false,
      resetToken: '',

    };
  }

  componentWillMount() {
    if (this.props && this.props.user && JSON.stringify(this.props.user) !== '{}') {
      browserHistory.push('/home/admin/main');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && JSON.stringify(nextProps.user) !== '{}') {
      if (nextProps.user.role.roleType === 'hotel' || nextProps.user.role.roleType === 'hotelCheckInAdmin' || nextProps.user.role.roleType === 'hotelCheckInStaff') {
        browserHistory.push('/home/hotel/bookings');
      }
      if (nextProps.user.role.roleType === 'remote') {
        browserHistory.push('/home/remote');
      }
      if (nextProps.user.role.roleType === 'admin') {
        browserHistory.push('/home/admin/main');
      }
    }
    if (nextProps && nextProps.error && nextProps.error !== '') {
      this.setState({ errorMessage: nextProps.error, openSnackBar: true });
    }

    if (nextProps && nextProps.codeSent === true) {
      if (nextProps && nextProps.codeVerify === true) {
        this.setState({ codeVerified: true });
      }
      this.setState({ codeSent: true });
    }

    if (nextProps && nextProps.resetToken !== '') {
      this.setState({ resetToken: nextProps.resetToken });
    }
    if (nextProps && nextProps.passwordChanged === true) {
      this.disableForgetDialog();
      browserHistory.push('/');
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.openSnackBar === true) {
      this.setState({ openSnackBar: false });
    }
  }


  disableForgetDialog() {
    this.props.forgetPasswordActions.resetAllForgetPasswordStates();
    this.setState({
      passwordReset: false,
      codeSent: false,
      codeVerified: false,
      resetToken: '',
    });
  }
  sendCode(user) {
    this.props.forgetPasswordActions.sendCode({
      email: user.email,
    });
  }
  verifyCode(user) {
    this.props.forgetPasswordActions.verifyCode(user);
  }

  setNewPassword(user) {
    const userWithToken = {
      token: this.state.resetToken,
      password: user.password,
    };
    this.props.forgetPasswordActions.setNewPassword(userWithToken);
  }

  enableForgetDialog() {
    this.setState({ passwordReset: true });
  }


  handleRequestClose() {
    this.props.NotificationActions.removeNotification();
  }

  handleLogin(user) {
    this.setState({ progressBar: true });
    this.props.actions.logInUser({
      email: user.email,
      password: user.password,
    });
  }
  render() {
    console.log('props', this.props);
    return (
      <div>
        <Grid fluid className="loginGrid">
          <Row className="loginGridRow">
            <Col xs={0} sm={6} md={7} lg={8}>
              <div className="MainLogo" />
            </Col>
            <Col xs={12} sm={6} md={5} lg={4} className="loginGridColLeft">

              {this.state.passwordReset ?
                <ForgetPassword
                  disableForgetDialog={this.disableForgetDialog}
                  sendCode={this.sendCode}
                  verifyCode={this.verifyCode}
                  setNewPassword={this.setNewPassword}
                  codeSent={this.state.codeSent}
                  codeVerified={this.state.codeVerified}
                /> :

                <Login login={this.handleLogin} enableForgetDialog={this.enableForgetDialog} />}

            </Col>

          </Row>
        </Grid>
        <LoaderIndicator />
        {
          this.props.isLoading > 0 ? <Snackbar
            open
            message={this.props.message}
            autoHideDuration={3000}
            onRequestClose={() => { this.handleRequestClose(this.props); }}
          /> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
    error: state.loginReducer.error,
    codeSent: state.ForgetPasswordReducer.codeSent,
    codeVerify: state.ForgetPasswordReducer.codeVerify,
    resetToken: state.ForgetPasswordReducer.resetToken,
    passwordChanged: state.ForgetPasswordReducer.passwordChanged,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    forgetPasswordActions: bindActionCreators(forgetPasswordActions, dispatch),

  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));

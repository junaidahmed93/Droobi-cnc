import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Validations from '../../utils/Validations';

const styles = {
  floatingStyle: {
    color: '#0D5BD5',
    fontSize: '18px',
    width: '90%',
  },
  loginHeading: {
    fontSize: '26px',
    fontWeight: '500',
  },
  loginButton: {
    width: '360px',
  },
  underlineStyle: {
    color: 'red',
  },
  error: {
    color: 'red',
  },
};
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    // this.handleLogin = this.handleLogin.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      verifiedEmail: true,
      verifiedPassword: true,
      forgetPassword: false,
      code: '',
      passwordMismatch: false,
    };
  }


  onTextFieldChange(e, fieldName) {
    if (fieldName === 'email') {
      this.setState({ email: e.target.value });
    }
    if (fieldName === 'code') {
      this.setState({ code: e.target.value });
    }
    if (fieldName === 'password') {
      this.setState({ password: e.target.value });
    }
    if (fieldName === 'confirm-password') {
      this.setState({ confirmPassword: e.target.value });
    }
  }

  sendCode() {
    this.setState({ verifiedEmail: true, passwordMismatch: false });
    if (this.props.codeSent === true && this.props.codeVerified === false) {
      if (this.state.code) {
        const user = {
          email: this.state.email,
          code: this.state.code,
        };
        this.props.verifyCode(user);
      }
    } else if (this.props.codeSent === true && this.props.codeVerified === true) {
      const user = {
        password: this.state.password,
      };
      if (this.state.password === this.state.confirmPassword) {
        this.props.setNewPassword(user);
      } else {
        this.setState({ passwordMismatch: true });
      }
    } else {
      const user = {
        email: this.state.email,
      };
      const emailValidate = Validations.validEmail(user.email);
      if (emailValidate) {
        this.props.sendCode(user);
      } else {
        this.setState({ verifiedEmail: false });
      }
    }
  }

  render() {
    console.log('this.props', this.props);
    return (
      /* eslint no-nested-ternary: "off" */
      <div className="loginPage">
        <div className="loginsection">

          <div className="loginForm">
            <span style={styles.loginHeading}>Forget Password</span>
            <br />
            <div>

              {this.props.codeSent
                ? (this.props.codeSent && this.props.codeVerified ?
                  <div>
                    <TextField
                      onChange={(e) => { this.onTextFieldChange(e, 'password'); }}
                      floatingLabelStyle={styles.floatingStyle}
                      labelStyle={{ color: 'green' }}
                      hintText="Password"
                      floatingLabelText="Password"
                      className="textField"
                      type="password"
                      value={this.state.password}
                    />
                    <TextField
                      onChange={(e) => { this.onTextFieldChange(e, 'confirm-password'); }}
                      floatingLabelStyle={styles.floatingStyle}
                      labelStyle={{ color: 'green' }}
                      hintText="Confirm Password"
                      floatingLabelText="confirm Password"
                      className="textField"
                      type="password"
                      value={this.state.confirmPassword}
                    />
                    {this.state.passwordMismatch ?
                      <span style={styles.error}>
                        Password Mismatch
                      </span>
                      : null}
                  </div> :
                  <TextField
                    onChange={(e) => { this.onTextFieldChange(e, 'code'); }}
                    floatingLabelStyle={styles.floatingStyle}
                    hintText="Enter your code"
                    floatingLabelText="Enter your code"
                    className="textField"
                    value={this.state.code}
                  />
                )
                : <TextField
                  onChange={(e) => { this.onTextFieldChange(e, 'email'); }}
                  floatingLabelStyle={styles.floatingStyle}
                  hintText="Enter your email"
                  floatingLabelText="Enter your email"
                  className="textField"
                  value={this.state.email}
                />}
              {this.state.verifiedEmail ? null : <span style={styles.error}>Missing or Invalid Email</span>}
              <br />
              <br />
              <RaisedButton
                label={this.state.code ? 'Verify' : 'Send'}
                onClick={this.sendCode}
                style={styles.loginButton}
                backgroundColor="#0D5BD5"
                labelColor="white"
              />
              <br /> <br />
              <RaisedButton
                label="Cancel"
                onClick={this.props.disableForgetDialog}
                style={styles.loginButton}
                backgroundColor="#0D5BD5"
                labelColor="white"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;

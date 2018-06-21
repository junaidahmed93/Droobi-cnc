import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Validations from '../utils/Validations';

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
  // underlineStyle: {
  //   color: "black"
  // },
  loginButton: {
    width: '360px',
  },
  otherText: {
    color: '#0D5BD5',
    marginLeft: '150px',
    cursor: 'pointer',
  },
  underlineStyle: {
    color: 'red',
  },
  error: {
    color: 'red',
  },
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.state = {
      email: '',
      password: '',
      verifiedEmail: true,
      verifiedPassword: true,
    };
  }

  onTextFieldChange(e, fieldName) {
    if (fieldName === 'email') {
      this.setState({ email: e.target.value });
    }
    if (fieldName === 'password') {
      this.setState({ password: e.target.value });
    }
  }

  handleLogin() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.userValid(user);
  }

  keyPressed(e) {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  }

  userValid(user) {
    // TOBE DELETE:
    // this.props.login(user);

    this.setState({ verifiedEmail: true, verifiedPassword: true });
    const emailValidate = Validations.validEmail(user.email);
    // let emailValidate;
    const passwordValidate = user.password.length > 5;

    if (emailValidate && passwordValidate) {
      this.props.login(user);
    } else {
      if (!emailValidate) {
        this.setState({ verifiedEmail: false });
      }
      if (!passwordValidate) {
        this.setState({ verifiedPassword: false });
      }
    }
  }


  render() {
    return (
      <div className="loginPage">
        <div className="loginsection">
          <div className="loginForm">
            <span style={styles.loginHeading}>Droobi Command N Control</span>
            <br />
            <div>
              <TextField
                onChange={(e) => { this.onTextFieldChange(e, 'email'); }}
                floatingLabelStyle={styles.floatingStyle}
                hintText="CNC Email"
                floatingLabelText="CNC Email"
                className="textField"
                value={this.state.email}
                autoComplete="new-password"
                onKeyUp={this.keyPressed}
              />
              {this.state.verifiedEmail ? null : <span style={styles.error}>Missing or Invalid Email</span>}
              <TextField
                onChange={(e) => { this.onTextFieldChange(e, 'password'); }}
                floatingLabelStyle={styles.floatingStyle}
                labelStyle={{ color: 'green' }}
                hintText="Password"
                floatingLabelText="Password"
                className="textField"
                type="password"
                value={this.state.password}
                autoComplete="new-password"
                onKeyUp={this.keyPressed}
              />
              {this.state.verifiedPassword ? null : <span style={styles.error}>Missing or Invalid Password</span>}
              <br />
              <br />
              <div style={{ float: 'right' }}>
                <span style={styles.otherText} onClick={this.props.enableForgetDialog}>Forget Password?</span>
              </div>
              <br />
              <br />
              <RaisedButton
                label="CNC Login"
                onClick={this.handleLogin}
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

export default Login;

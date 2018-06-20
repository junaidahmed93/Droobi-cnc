import React from 'react';
import TextField from 'material-ui/TextField';
import { onInputBlur, onInputChange } from '../../../utils/Helpers';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#27BCBD',
  },
};

export default class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyle: styles.labelStyleDefault,
      errorText: '',
    };
  }
  onChange = (object, value) => {
    const { id, type } = this.props;
    let updValue = value;
    if (type === 'number' && (value === '' || Number(value) < 0)) {
      updValue = '';
    }
    if (id === 'contactNumber' || id === 'emergencyNumber' || id === 'phoneNumber') {
      if (updValue.charCodeAt(0) === 43) {
        for (let i = 1; i < updValue.length; i++) {
          if (!(updValue.charCodeAt(i) > 47 && updValue.charCodeAt(i) < 58)) {
            updValue = updValue.substr(0, i);
          }
        }
      } else {
        updValue = '';
      }
    }
    if ((id === 'luggages' || id === 'bookingLimit') && (value === '' || Number(value) < 1)) {
      updValue = '';
    }

    if (id === 'flightNumber') {
      updValue = updValue.toUpperCase();
    }
    this.props.setValue(id, updValue);
    const validInput = onInputChange(id, updValue);

    this.setState({
      value: updValue,
      errorText: validInput.error,
      labelStyle: { color: validInput.color },
    });
  };

  onBlur = () => {
    const { id } = this.props;
    const { value } = this.state;
    const validInput = onInputBlur(id, value);
    this.setState({
      errorText: validInput.error,
      labelStyle: { color: validInput.color },
    });
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.prefilled) {
      this.setState({ value: nextProps.prefilled });
    }
  }

  render() {
    return (

      <TextField
        style={{ width: '90%', paddingLeft: this.props.extraPadding }}
        hintText={this.props.hintText}
        value={this.state.value}
        type={this.props.type}
        onChange={this.onChange}
        onBlur={this.onBlur}
        errorText={this.state.errorText}
        htmlFor={this.props.id}
        floatingLabelText={this.props.label}
        floatingLabelStyle={this.state.labelStyle}
        floatingLabelFocusStyle={{ color: '#27BCBD' }}
        floatingLabelFixed={this.props.fixedFloat}
        underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid gray' }}
        inputStyle={this.props.disabled ? { cursor: 'default' } : { cursor: 'inherit' }}
        disabled={this.props.disabled}
        autoComplete="new-password"
        max="2100-12-31"
      />

    );
  }
}

import React from 'react';
import TextField from 'material-ui/TextField';
import { onInputBlur, onInputChange } from '../../../utils/Helpers';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#0D5BD5',
  },
};
export default class InputEditBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyleFocus: {},
      labelStyle: styles.labelStyleFilled,
      errorText: '',
    };
  }
  onChange = (object, value) => {
    const { id, type } = this.props;
    let updValue = value;
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
    if (type === 'number' && (value === '' || Number(value) < 0)) {
      updValue = '';
    }
    if ((id === 'luggages' || id === 'bookingLimit') && (value === '' || Number(value) < 1)) {
      updValue = '';
    }
    this.props.setValue(this.props.id, updValue);

    const validInput = onInputChange(id, updValue);
    this.setState({
      value: updValue,
      errorText: validInput.error,
      labelStyle: validInput.color,
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
      // <div className="form-field">
      <TextField
        style={{ width: '90%', paddingLeft: this.props.extraPadding }}
        value={this.state.value}
        hintText={this.props.hintText}
        type={this.props.type}
        onChange={this.onChange}
        onBlur={this.onBlur}
        errorText={this.state.errorText}
        htmlFor={this.props.id}
        floatingLabelText={this.props.label}
        floatingLabelStyle={this.state.labelStyle}
        floatingLabelFocusStyle={{ color: '#0D5BD5' }}
        floatingLabelFixed={this.props.fixedFloat}
        underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid #D3D3D3' }}
        inputStyle={this.props.disabled ? { cursor: 'default' } : { cursor: 'inherit' }}
        disabled={this.props.disabled}
        max="2100-12-31"
        multiLine={this.props.multiLine}
        rows={this.props.rows}
        rowsMax={this.props.rowsMax}
      />
      // </div>
    );
  }
}

import React from 'react';
import TextField from 'material-ui/TextField';
import { onInputChange } from '../../../utils/Helpers';
import Converters from '../../../utils/Converters';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#0D5BD5',
  },
};
export default class InputFutureDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyleFocus: {},
      labelStyle: styles.labelStyleFilled,
      errorText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.prefilled) {
      this.setState({ value: nextProps.prefilled });
    }
  }

  onChange = (object, value) => {
    const { id, type } = this.props;
    let updValue = value.toUpperCase();
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
    // const { id } = this.props;
    // const { value } = this.state;
    // console.log("onBlur id ++++++++", id);
    // console.log("onblurrr value", value)
    // let validInput = onInputBlur(id, value);
    // this.setState({
    //     errorText: validInput.error,
    //     labelStyle: { color: validInput.color }
    // });
  };

  keyPressed(e) {
    e.preventDefault();
  }

  render() {
    return (
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
        floatingLabelStyle={{ color: '#0D5BD5' }}
        floatingLabelFocusStyle={{ color: '#0D5BD5' }}
        floatingLabelFixed={this.props.fixedFloat}
        underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid #D3D3D3' }}
        inputStyle={this.props.disabled ? { cursor: 'default' } : { cursor: 'inherit' }}
        disabled={this.props.disabled}
        max="2100-12-31"
        min={Converters.dateConverter(new Date().getTime())}
        onKeyPress={this.keyPressed}
        onKeyDown={this.keyPressed}
        onKeyUp={this.keyPressed}
      />
    );
  }
}

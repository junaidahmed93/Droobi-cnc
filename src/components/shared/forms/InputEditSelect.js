import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { onInputChange } from '../../../utils/Helpers';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
};

export default class InputEditSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyleFocus: {},
      labelStyle: styles.labelStyleDefault,
      errorText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.prefilled });
  }

    onChange = (object, index, value) => {
      const { id } = this.props;
      const updValue = value;
      this.props.setValue(this.props.id, updValue);

      const validInput = onInputChange(id, updValue);
      this.setState({
        value: updValue,
        errorText: validInput.error,
        labelStyle: { color: validInput.color },
        labelStyleFocus: { color: validInput.color },
      });
    };

    render() {
      const {
        id, label, disabled, values,
      } = this.props;
      const {
        errorText, labelStyle, value, labelStyleFocus,
      } = this.state;
      return (
        <SelectField
          className="SelectField"
          style={{ width: '90%', paddingLeft: this.props.extraPadding }}
          htmlFor={id}
          errorText={errorText}
          floatingLabelText={label}
          floatingLabelStyle={labelStyle}
          floatingLabelFocusStyle={labelStyleFocus}
          value={value}
          onBlur={this.onBlur}
          onChange={this.onChange}
          underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid #D3D3D3' }}
          inputStyle={disabled ? { cursor: 'default' } : { cursor: 'inherit' }}
          disabled={disabled}
        >
          {values.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
        </SelectField>

      );
    }
}


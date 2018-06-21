import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { onInputChange } from '../../../utils/Helpers';
/* eslint array-callback-return:"off" */
const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#0D5BD5',
  },
};

export default class BookingInputSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      labelStyleFocus: styles.labelStyleFilled,
      labelStyle: styles.labelStyleDefault,
      errorText: '',
    };
  }

  onChange = (object, index, value) => {
    console.log('on Change');
    const { id } = this.props;
    this.props.setValue(id, value);
    const validInput = onInputChange(id, value);

    this.setState({
      value,
      errorText: validInput.error,
      labelStyle: { color: validInput.color },
      labelStyleFocus: { color: validInput.color },
    });
  };

  render() {
    const { id, label, values } = this.props;
    const {
      errorText, labelStyle, value, labelStyleFocus,
    } = this.state;
    return (
      <SelectField
        maxHeight={250}
        style={{ width: '90%', paddingLeft: this.props.extraPadding }}
        htmlFor={id}
        errorText={errorText}
        floatingLabelText={label}
        floatingLabelStyle={labelStyle}
        floatingLabelFocusStyle={labelStyleFocus}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      >
        {values.map((v, i) => {
          const e = `${v.substr(0, 3)}, ${v.substr(8, 2)} ${v.substr(4, 3)} ${v.substr(16, 5)}`;
          if (label === 'Time') {
            return <MenuItem value={v} primaryText={e} key={v} />;
          }

          if (i < 73) {
            return <MenuItem value={v} primaryText={e} key={v} />;
          }
        })}
      </SelectField>
    );
  }
}


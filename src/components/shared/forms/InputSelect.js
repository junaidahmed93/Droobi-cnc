import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { onInputChange } from '../../../utils/Helpers';

const styles = {
  labelStyleDefault: {
    color: '#555',
  },
  labelStyleFilled: {
    color: '#0D5BD5',
  },
};

export default class InputSelect extends React.Component {
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
          id={id}
          errorText={errorText}
          floatingLabelText={label}
          floatingLabelStyle={labelStyle}
          floatingLabelFocusStyle={labelStyleFocus}
          value={value}
          onBlur={this.onBlur}
          onChange={this.onChange}
        >
          {values.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
        </SelectField>
      );
    }
}


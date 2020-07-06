import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '../text-field';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};

export default ({InputProps, ...props}: any) => {
  return (
    <TextField
      InputProps={{
        inputComponent: NumberFormatCustom,
        ...InputProps,
      }}
      {...props}
    />
  );
}
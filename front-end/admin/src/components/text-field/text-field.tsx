import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    inputLabel: {
      fontSize: '0.875rem',
      transform: 'translate(14px, 18px) scale(1)'
    },
  })
);
export default ({InputLabelProps={}, multiline, inputProps={}, ...props}: TextFieldProps) => {
  const classes = useStyles();
  const maxLength = multiline ? 200 : 50;
  const {variant, ...otherProps} = props;
  const {className: InputLabelPropsClassName, ...otherInputLabelProps} = InputLabelProps;
  const {className: inputPropsClassName, ...otherinputProps} = inputProps;
  const _InputLabelProps = {className: clsx(classes.inputLabel, InputLabelPropsClassName), ...otherInputLabelProps};
  const _inputProps = {className: inputPropsClassName, maxLength, ...otherinputProps};

  if(variant){
    return (
      <TextField InputLabelProps={_InputLabelProps} inputProps={_inputProps} multiline={multiline} {...props}/>
    );
  }
  return (
    <TextField variant={"outlined"} InputLabelProps={_InputLabelProps} inputProps={_inputProps} multiline={multiline} {...otherProps}/>
  );
}
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import {getAccuracy} from '@/lib/currency/money-accuracy';
import NumberFormatTextField from '../../text-field/number-format-text-field';

const useStyles = makeStyles(() =>
  createStyles({
    adornment: {
      fontSize: '0.875rem',
    },
    left: {
      textAlign: 'left'
    },
    center: {
      textAlign: 'center'
    },
    right: {
      textAlign: 'right'
    }
  })
);

interface Props {
  currency?: string;
  value?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  digit?: number;
  align?: 'left' | 'center' | 'right';
  onChange?: (e: any) => void
}

export default ({currency='BTC', onChange, ...props}: Props) => {
  const classes = useStyles();

  const transfer = (v: string) => {
    if(v.startsWith('0') && !v.startsWith('0.')){
      const _v = v.substr(1, v.length);
      transfer(_v);
    }
    return v;
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    e.target.value = transfer(value);
    onChange && onChange(e);
  };

  return (
    <NumberFormatTextField
      InputProps={{
        endAdornment: <InputAdornment disableTypography position="end" style={{width: 15*currency.length}} className={classes.adornment}>{currency}</InputAdornment>,
        inputProps: {decimalScale: getAccuracy(currency), allowNegative: false},
      }}
      onChange={handleChange}
      {...props}
    />
  );
}
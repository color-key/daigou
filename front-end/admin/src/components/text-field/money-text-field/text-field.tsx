import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@/components/text-field';
import {getAccuracy} from '@/lib/currency/money-accuracy';

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
  onChange?: (e: string) => void
}

export default ({currency='BTC', digit, align='left', disabled, onChange=()=>({}), ...props}: Props) => {
  const classes = useStyles();
  // const [input, setInput] =React.useState(props.value);

  // React.useEffect(() => {
  //   setInput(props.value);
  // }, [props.value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value;
    let newValue = transferValue(value);
    newValue = newValue ? newValue.replace(/,/g, '') : '';
    if(!(digit && newValue.replace('.', '').length > digit)){
      onChange(newValue);
    }
  };

  const transferValue = (value: string | undefined | null) => {
    if (value === "" || value === undefined || value === null) {
      return "";
    }
    if (value === ".") {
      return "0.";
    }
    if (value.charAt(0) === "0") {
      if(value.length === 2 && value.charAt(1) === ".") { // 0.
        return value;
      }
      if(value.length === 2 && /^[0-9]*$/.test(value.charAt(1))) { // 02
        return value.substring(1, value.length);
      }
      if(value.length > 2 && value.charAt(1) === "." && !/^[0-9]*$/.test(value.charAt(2))) { // 0..
        return "0.";
      }
    }
    value = value.replace(/,/g, "");
    let point = "";
    if (value.charAt(value.length -1) === ".") {
      const list = value.match(/\./g);
      if (list && list.length === 1) {
        point = ".";
        value = value.replace(/\./, "");
      } else {
        return props.value;
      }
    }
    if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(value)) {
      let money: any = Number.parseFloat(value)
      if (money > 1) {
        money = money.toLocaleString()
      } else {
        money = value;
      }
      if (Number.parseFloat(value.split(".")[1]) === 0) {
        money = value
      }
      if(money.replace(/,/g, "").split(".")[0].length > 15) {
        return props.value;
      }
      if (point === ".") {
        return String(money)+".";
      } else {
        const pointMoney = money.split(".")[1] ? money.split(".")[1] : "0"
        let pointValue = value.split(".")[1]
        if (pointValue >= pointMoney) {
          if (pointValue.length > getAccuracy(currency)) {
            pointValue = pointValue.substring(0, getAccuracy(currency));
          }
          return money.split(".")[0] + "." + pointValue;
        } else {
          return money === "0" ? value : String(money);
        }
      }
    }
    return props.value;
  }
  const checked = transferValue(props.value);
  return (
  <TextField
  InputProps={{
    endAdornment: <InputAdornment disableTypography position="end" style={{width: 15*currency.length}} className={classes.adornment}>{currency}</InputAdornment>
  }}
  inputProps={{className: classes[align]}}
  disabled={disabled}
  {...props}
  onChange={handleInput}
  value={checked}
  />
  );
}
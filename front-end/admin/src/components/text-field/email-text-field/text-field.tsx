import React from 'react';
import TextField from '@/components/text-field';
import {getLocale} from "./locale";

const checkEmail = (value:string, notEmpty: boolean) => {
  const localeLangData = getLocale().lang;
  if(!notEmpty && value.trim() === ''){
    return '';
  }
  if(value.trim() === ''){
    return localeLangData.notEmpty;
  }else if(notEmpty && !(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))){
    return localeLangData.error;
  }
  return '';
};

export default ({notEmpty=false, value, disabled=false, onChange, fullWidth, label, placeholder, ...props}: any) => {
  const [error, setError] = React.useState('');

  const handleChange = (e: any) => {
    const v = e.target.value;
    const checkMessage = checkEmail(v, notEmpty);
    setError(checkMessage);
    onChange && onChange(v, checkMessage.length === 0);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      error={error.length>0}
      helperText={error}
      {...props}
    />
  );
}
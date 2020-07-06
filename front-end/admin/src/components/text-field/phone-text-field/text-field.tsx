import React from 'react';
import TextField from '@/components/text-field';
import {checkTargetLocale} from '@fay-react/lib/phone';
import {getLocale} from "./locale";

const checkPhone = (value:string, notEmpty: boolean, locale?: string) => {
  const localeLangData = getLocale().lang;
  if(!notEmpty && value.trim() === ''){
    return '';
  }
  if(value.trim() === ''){
    return localeLangData.notEmpty;
  }
  if(!checkTargetLocale(value, locale)){
    return localeLangData.error;
  }
  return '';
};

export default ({notEmpty=false, value, locale, onChange, disabled=false, fullWidth, label, placeholder, ...props}: any) => {
  const [error, setError] = React.useState('');

  const handleChange = (e: any) => {
    const v = e.target.value;
    const checkMessage = checkPhone(v, notEmpty, locale);
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
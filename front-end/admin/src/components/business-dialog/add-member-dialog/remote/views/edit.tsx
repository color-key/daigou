import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '../../../../text-field';
import EmailTextField from '../../../../text-field/email-text-field';
import PhoneTextField from '../../../../text-field/phone-text-field';
import validPublicKey from '@/lib/validate/public-key';
import {useLocale} from "../../../../locale";
import {Locale} from "../locale";

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(1, 0, 1.5, 0)
    },
    select: {
      margin: theme.spacing(2.5, 0, 1, 0)
    }
  })
);

interface Props {
  onChange: (v: ValueType|null) => void;
  submitError?: Error;
  disabled?: boolean
}

export interface ValueType {
  name: string,
  phone: string|null,
  email: string|null,
  publicKey: string
}

const initValues = {name: '', phone: '', email: '', publicKey: ''};
let checkEmail = false;
let checkPhone = true;

export default ({onChange, disabled}: Props) => {
  const classes = useStyles();

  const [values, setValues] = React.useState<ValueType>(initValues);
  const localeLangData = useLocale<Locale>().lang.edit;
  const [publicKeyErr, setPublicKeyErr] = React.useState('');

  const handleChange = (name: string, value: string|null) => {
    setValues({...values, [name]: value});
    if(name === 'publicKey' && value){
      setPublicKeyErr(validPublicKey(value)?'':localeLangData[3].error);
    }
  };

  const phoneChange = (v: string, check: boolean) => {
    checkPhone = check;
    handleChange('phone', v);
  };

  const emailChange = (v: string, check: boolean) => {
    checkEmail = check;
    handleChange('email', v);
  };

  React.useEffect(() => {
    if(values.name.length > 0 && checkEmail && checkPhone && values.publicKey.length>0 && validPublicKey(values.publicKey)){
      onChange(values);
    }else{
      onChange(null);
    }
  }, [JSON.stringify(values)]);

  return (
    <>
      <TextField
        label={localeLangData[0].label+" *"}
        placeholder={localeLangData[0].placeholder}
        fullWidth
        value={values.name}
        onChange={(e: any) => handleChange('name', e.target.value)}
        variant="outlined"
        disabled={disabled}
        className={classes.textField}
      />
      <PhoneTextField
        label={localeLangData[1].label}
        placeholder={localeLangData[1].placeholder}
        disabled={disabled}
        onChange={phoneChange}
        fullWidth
        className={classes.textField}
      />
      <EmailTextField
        notEmpty
        label={localeLangData[2].label+" *"}
        placeholder={localeLangData[2].placeholder}
        disabled={disabled}
        onChange={emailChange}
        fullWidth
        className={classes.textField}
      />
      <TextField
        label={localeLangData[3].label+" *"}
        placeholder={localeLangData[3].placeholder}
        fullWidth
        multiline
        error={publicKeyErr.length>0}
        helperText={publicKeyErr}
        value={values.publicKey}
        onChange={(e: any) => handleChange('publicKey', e.target.value)}
        variant="outlined"
        disabled={disabled}
        className={classes.textField}
      />
    </>
  );
}

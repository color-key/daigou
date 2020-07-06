import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@/components/text-field';
import EmailTextField from '../../../../text-field/email-text-field';
import PhoneTextField from '../../../../text-field/phone-text-field';
import MemberDeviceSelect, {Device} from '../../../../business-select/member-device-select';
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
  device: string|null
}

const initValues = {name: '', phone: '', email: '',device: null};
let checkEmail = false;
let checkPhone = true;

export default ({onChange, disabled}: Props) => {
  const classes = useStyles();

  const [values, setValues] = React.useState<ValueType>(initValues);
  const localeLangData = useLocale<Locale>().lang.edit;

  const handleChange = (name: string, value: string|null) => {
    setValues({...values, [name]: value});
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
    if(values.name.length > 0 && checkPhone && checkEmail && values.device !== null && JSON.parse(values.device) !== null){
      onChange(values);
    }else{
      onChange(null);
    }
  }, [JSON.stringify(values)]);

  React.useEffect(() => {
    return () => {
      checkEmail = false;
      checkPhone = true;
    }
  }, []);

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
      <MemberDeviceSelect
        className={classes.select}
        disabled={disabled}
        onSelect={(v: Device) => handleChange('device', JSON.stringify(v))}
      />
    </>
  );
}

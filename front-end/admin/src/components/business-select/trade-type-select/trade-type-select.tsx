import React from 'react';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import {getLocale, Type} from './locale';

interface Props {
  label?: string,
  value?: string,
  disabled?: boolean,
  onChange?: (v: string) => void
}

export default ({label, disabled, value, onChange}: Props) => {
  return (
    <Select label={label} value={value} onChange={onChange} disabled={disabled}>
      {
        getLocale().map((type: Type) => <MenuItem key={type.id} value={type.text}>{type.text}</MenuItem>)
      }
    </Select>
  );
}
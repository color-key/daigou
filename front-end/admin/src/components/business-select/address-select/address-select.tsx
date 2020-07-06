import React from 'react';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import {Address} from './index';

// const useStyles = makeStyles(() =>
// createStyles({
//
// })
// );

interface Props {
  label?: string,
  data: Address[],
  value: Address|null,
  onChange: (v: string) => void,
  excludes?: string[]
}

export default ({ label, value, data, onChange }: Props) => {
  // const classes = useStyles();

  const handleChange = (v: string) => {
    onChange(JSON.parse(v));
  };

  return (
    <Select label={label} value={value?JSON.stringify(value):''} onChange={handleChange}>
      {
        data.map((d: Address) => <MenuItem key={d.id} value={JSON.stringify(d)}>{d.address}</MenuItem>)
      }
    </Select>
  );
}
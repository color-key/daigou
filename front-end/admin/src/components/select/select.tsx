import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    formControl: {
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      transform: 'translate(14px, 16px) scale(1)',
    },
    select: {
      '& .MuiSelect-root':{
        padding: '14.5px 14px'
      },
    },
    menu: {
      maxHeight: '300px',
      '-webkit-app-region': 'no-drag'
    }
  })
);

interface Props{
  className?: string,
  label?: string,
  value?: unknown,
  error?: string,
  disabled?: boolean,
  onChange?: (value: string) => void,
  children?: React.ReactNode,
  renderValue?: (value: unknown) => React.ReactNode;
}


export default ({className, disabled, label, value='', renderValue, error, onChange, children}: Props) => {
  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth || Number((label||'').length) * 16);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange && onChange(event.target.value as string);
  };
  const showError = !!error && error.length > 0;
  return (
    <div className={clsx(classes.root, className)}>
      <FormControl variant="outlined" className={classes.formControl} error={showError} disabled={disabled}>
        <InputLabel ref={inputLabel} className={classes.label}>
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          labelWidth={labelWidth}
          renderValue={renderValue}
          className={classes.select}
          MenuProps={{className: classes.menu}}
          IconComponent={KeyboardArrowDownIcon}
        >
          {children}
        </Select>
        {showError && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
}
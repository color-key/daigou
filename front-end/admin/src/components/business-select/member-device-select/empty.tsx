import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {getLocale} from "./locale";

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    width: '100%',
    height: '68px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[500]}`,
    color: theme.palette.grey[500]
  },
})
);

export default () => {
  const classes = useStyles();
  const locale = getLocale();

  return (
    <div className={classes.root}>
      <Typography variant={"inherit"}>{locale.lang.empty}</Typography>
    </div>
  )
}
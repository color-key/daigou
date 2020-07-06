import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SelectDevice from './select-device';
import CircularProgress from "@material-ui/core/CircularProgress";
import {getLocale} from "./locale";

const useStyles = makeStyles((theme) =>
  createStyles({
    listTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.75rem',
      marginBottom: theme.spacing(2.25)
    },
    listTitleLeft: {
      color: theme.palette.grey[600]
    },
    search: {
      display: 'flex',
    },
    deviceList: {
      height: 'calc(100% - 35px)',
      padding: theme.spacing(0.25),
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  })
);

export default ({disabled=false, onSelect, ...props}: any) => {
  const classes = useStyles();
  const locale = getLocale();

  return (
    <div {...props}>
      {
        disabled ||
        <div className={classes.listTitle}>
          <Typography variant={"inherit"} className={classes.listTitleLeft}>{locale.lang.select}</Typography>
          <div className={classes.search}>
            <CircularProgress size={16}/>
            <Typography variant={"inherit"}>{locale.lang.searching}</Typography>
          </div>
        </div>
      }
      <div className={classes.deviceList}>
        <SelectDevice disabled={disabled} onSelect={onSelect}/>
      </div>
    </div>
  )
}
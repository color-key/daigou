import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {getLocale} from "./locale";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      marginTop: 40,
      position: 'relative',
      height: 24
    },
    divider: {
      position: 'relative',
      height: 1,
      '&:before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        width: '80%',
        height: 1,
        backgroundImage: 'linear-gradient(to right, transparent, darkgrey, transparent)'
      },
      '&:after': {
        content: "''",
        position: 'absolute',
        zIndex: 1,
        top: '-9px',
        left: 'calc(50% - 50px)',
        width: '100px',
        height: '18px',
        backgroundColor: '#F3F5F8',
      }
    },
    text: {
      color: theme.palette.grey[400],
      position: 'absolute',
      marginTop: '-12px',
      left: 'calc(50% - 50px)',
      width: 100,
      zIndex: 2,
      fontSize: '0.875rem'
    }
  })
);

export default () => {
  const classes = useStyles();
  const localeLangData = getLocale().lang;

  return (
    <div className={classes.root}>
      <div className={classes.divider}/>
      <Typography className={classes.text}>{localeLangData.end}</Typography>
    </div>
  );
}

import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useLocale} from "@/components/locale";
import {getLocale, Locale} from './locale';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: '50%',
      width: 106,
      height: 106,
      animation: "$componentsSeal 0.6s ease",
      position: 'absolute',
      backgroundColor: 'none',
      top: '70px',
      right: '40px',
      zIndex: 2,
      opacity: "1",
      display: 'flex',
      justifyContent: 'center',
      alignItems:'center',
    },
    "@keyframes componentsSeal": {
      "0%": {
        top: '120px',
        width: 180,
        height: 180,
        right: '3px',
        opacity: "0",
        boxShadow: '0px 11px 215px -7px rgba(33,33,33,0.16), 0px 9px 246px 8px rgba(33,33,33,0.08), 0px 24px 238px 3px rgba(33,33,33,0.1);'
      },
      "50%": {
        top: '120px',
        width: 180,
        height: 180,
        right: '3px',
        opacity: "0",
        boxShadow: '0px 11px 215px -7px rgba(33,33,33,0.16), 0px 9px 246px 8px rgba(33,33,33,0.08), 0px 24px 238px 3px rgba(33,33,33,0.1);'
      },
      "100%": {
        width: 106,
        height: 106,
        top: '70px',
        right: '40px',
        opacity: "1",
        boxShadow: 'none'
      }
    },
  })
);

export interface Props {
  type: 'auditing' | 'complete' | 'pending' |'expired' |'reject' |'cancel' | 'pass' | 'revoked' | undefined
}

export default ({type}: Props) => {
  const classes = useStyles();
  useLocale();
  const Icon = type ? getLocale<Locale>().lang.sealIcon[type] : undefined;
  return (
    Icon ? <Icon className={classes.root}/> : <div/>
  )
}
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {getLocale} from "@/components/assets-card/locale";
import {useLocale} from "@/components/locale";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      height: 88,
      width: 88,
      bottom: 0,
      right: 0,
    },
  }),
);

export interface Wallet {
  walletName: string,
  walletId: number,
  status: string
}

interface Props {
  status?: 'auditing' | 'freeze',
}

export default ({status}: Props) => {
  const classes = useStyles();
  useLocale();
  const localeLangData = getLocale().lang;
  if(status){
    const Icon = localeLangData.statusIcon[status];
    return <Icon className={classes.root}/>;
  }
  return <div/>;
}
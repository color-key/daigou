import React from 'react';
import Currency from "../../currency/icon";
import Typography from "@material-ui/core/Typography";
import {currencyFullNameMap, currencyShortNameMap} from "@/lib/currency";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    currencyImg: {
      marginRight: theme.spacing(0.5)
    },
    currencyFull: {
      color: theme.palette.common.black,
      fontWeight: 500,
      marginTop: theme.spacing(0.25)
    },
    currencyShort: {
      fontSize: '0.75rem',
      marginLeft: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
    },
  })
);

interface Props {
  className?: string,
  type:string
}

export default ({className, type, ...props}: Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...props}>
      <Currency className={classes.currencyImg} type={type}/>
      <Typography variant={"inherit"} className={classes.currencyFull}>{currencyFullNameMap[type]}</Typography>
      <Typography variant={"inherit"} className={classes.currencyShort}>({currencyShortNameMap[type]})</Typography>
    </div>
  )
}
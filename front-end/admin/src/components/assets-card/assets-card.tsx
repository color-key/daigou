import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '../card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import PaymentIcon from '@material-ui/icons/Payment';
import Charts from './charts';
import clsx from 'clsx';
import {useTheme, Theme} from '@/components/theme';
import CurrencyIcon from '@/components/currency/icon';
import Status from './status';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
      height: 240,
      position: 'relative'
    },
    title: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(2, 2, 0, 2),
      // width: 240
    },
    titlePrimary: {
      display: 'flex',
    },
    name: {
      alignSelf: 'center',
      marginLeft: theme.spacing(1),
      color: theme.palette.grey[700],
      fontWeight: 500,
      width: 130
    },
    charts: {
      height: 192,
    },
    more: {
      marginTop: '-30px',
      marginLeft: 'calc(100% - 40px)'
    },
  }),
);

export interface Wallet {
  walletName: string,
  walletId: number,
  status: string
}

interface Props {
  color?: number,
  onClick?: (event: any) => void,
  accuracy: number
  id: string,
  name: string,
  status?: 'auditing' | 'freeze',
  currency?: boolean,
  unit?: string,
  className?: string,
  timeout?: number,
  actions?: React.ReactNode,
}

const ContentWapper = ({onClick, children}: any) => onClick ? <CardActionArea onClick={onClick}>{children}</CardActionArea> : children;

export default ({id, color=3, name, status, onClick, accuracy, currency, unit, actions, className, timeout, ...props}: Props) => {
  const classes = useStyles();
  const {orange, skyBlue, blue, cyan, purple} = useTheme().charts.colors;
  const Color = [orange.light, skyBlue.light, purple.light, blue.light, cyan.light];
  const SeriesColor = [orange.main, skyBlue.main, purple.main, blue.main, cyan.main];

  return (
    <Card className={clsx(classes.root, className)} {...props}>
      <ContentWapper onClick={onClick}>
        <div className={classes.title}>
          <div className={classes.titlePrimary}>
            {currency ? <CurrencyIcon type={name}/> : <PaymentIcon htmlColor={SeriesColor[color]}/>}
            <Typography variant={"body2"} className={classes.name} noWrap>{name}</Typography>
          </div>
        </div>
        <div className={classes.charts}>
          <Charts id={id} type={currency ? 'currency' : 'wallet'} currency={currency ? name: undefined} color={Color[color]} seriesColor={SeriesColor[color]} accuracy={accuracy} unit={unit} timeout={timeout}/>
        </div>
      </ContentWapper>
      <div className={classes.more}>
        {actions}
      </div>
      <Status status={status}/>
    </Card>
  );
}
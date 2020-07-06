import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card, {CardProps} from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import clsx from 'clsx';
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  card: {
    animation: "$componentsCard 1s",
    // '&:hover': {
      // boxShadow: '0px 3px 5px -1px rgba(33,33,33,0.16),0px 1px 18px 0px rgba(33,33,33,0.08),0px 6px 10px 0px rgba(33,33,33,0.1)'
    // }
  },
  cardLoading: {
    backgroundColor: theme.palette.grey[100],
    '& *':{
      color: theme.palette.grey[500],
    }
  },
  "@keyframes componentsCard": {
    "0%": {
      marginTop: theme.spacing(2),
      opacity: "0"
    },
    "100%": {
      marginTop: theme.spacing(0),
      opacity: "1"
    }
  },
}));

interface Props extends CardProps{
  loading?: boolean,
  onClick?: () => void
}

const WrapperComponent = ({children, onClick}: any) => onClick?<CardActionArea onClick={onClick}>{children}</CardActionArea> : children;

export default ({loading=false, onClick, children, className, ...props}: Props) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, {[classes.cardLoading]: loading}, className)} {...props}>
      <WrapperComponent onClick={onClick}>
        {loading && <LinearProgress />}
        {children}
      </WrapperComponent>
    </Card>
  )
}
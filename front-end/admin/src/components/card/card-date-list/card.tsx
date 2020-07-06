import React from 'react';
import Typography from "@material-ui/core/Typography";
import Card from "../card-left-to-right";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
createStyles({
  date: {
    margin: theme.spacing(0.75, 1.25),
    fontSize: '0.75rem',
    color: theme.palette.grey[500]
  },
  cardHasLast: {
    marginTop: '-19px',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    animation: "$workbenchCard 1s",
    boxShadow: '0px 1px 0px 0px rgba(33,33,33,0.16), 0px 3px 1px -2px rgba(33,33,33,0.08), 0px 2px 2px 0px rgba(33,33,33,0.1)'
  },
  "@keyframes workbenchCard": {
    "0%": {
      marginTop: '0',
      opacity: "0"
    },
    "100%": {
      marginTop: '-19px',
      opacity: "1"
    }
  },
}),
);

interface Props {
  hasLast?: boolean,
  date: string,
  className?: string,
  children: React.ReactNode
  onClick?: () => void,
  style?: object
}

export default ({hasLast=false, style, className, onClick, date, children}: Props) => {
  const classes = useStyles();

  return (
    <div>
      {
        hasLast ||
        <div className={classes.date}>
          <Typography variant={"inherit"}>{date}</Typography>
        </div>
      }
      <Card className={clsx({[classes.cardHasLast]: hasLast}, className)} justify={"space-between"} onClick={onClick} style={style}>
        {children}
      </Card>
    </div>
  )
}
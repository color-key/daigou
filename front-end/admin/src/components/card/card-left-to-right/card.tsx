import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '../card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2),
      border: '1px solid rgba(224,224,224,1)'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      minHeight: '56px',
      padding: theme.spacing(2),
      '&.MuiCardContent-root:last-child': {
        paddingBottom: theme.spacing(2),
      }
    },
  })
);

interface Props {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string,
  style?: object
  justify?: 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly',
}

export default ({children, justify='flex-start', className, ...props}: Props) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, className)} {...props}>
      <CardContent className={classes.content} style={{justifyContent: justify}}>
        {children}
      </CardContent>
    </Card>
  );
}
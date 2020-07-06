import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '../card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2),
      border: '1px solid rgba(224,224,224,1)'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      height: 68
    },
    textContent: {
      margin: theme.spacing(0, 0, 0, 2.25)
    },
    primary: {
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center'
    },
    textSecondary: {
      fontSize: '0.75rem'
    },
  })
);

interface Props {
  icon?: React.ReactNode,
  primary: string | React.ReactNode,
  secondary?: string,
  loading?: boolean,
  onClick?: () => void
}

export default ({loading, icon, primary, secondary, ...props}: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} loading={loading} {...props}>
      <CardContent className={classes.content}>
        {icon}
        <div className={classes.textContent}>
          <Typography gutterBottom variant="body2" className={classes.primary}>
            {primary}
          </Typography>
          {
            secondary &&
            <Typography variant="body2" color="textSecondary" className={classes.textSecondary}>
              {secondary}
            </Typography>
          }
        </div>
      </CardContent>
    </Card>
  );
}
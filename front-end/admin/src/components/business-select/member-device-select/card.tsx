import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2),
      border: '1px solid rgba(224,224,224,1)'
    },
    cardSelected: {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
    },
    media: {
      height: 140,
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
      fontWeight: 500
    },
    textSecondary: {
      fontSize: '0.75rem'
    },
  })
);

interface Props {
  icon?: React.ReactNode,
  primary: string,
  secondary: string,
  selected?: boolean,
  onClick?: (event: any) => void
}

export default ({icon, primary, secondary, onClick, selected=false}: Props) => {
  const classes = useStyles();

  const WapperComponent = ({children}: any) => onClick?<CardActionArea onClick={onClick}>{children}</CardActionArea> : children;
  return (
    <Card className={clsx(classes.card, {[classes.cardSelected]: selected})}>
      <WapperComponent>
        <CardContent className={classes.content}>
          {icon}
          <div className={classes.textContent}>
            <Typography gutterBottom variant="body2" className={classes.primary}>
              {primary}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.textSecondary}>
              {secondary}
            </Typography>
          </div>
        </CardContent>
      </WapperComponent>
    </Card>
  );
}
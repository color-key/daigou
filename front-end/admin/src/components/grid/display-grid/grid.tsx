import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    row: {
      borderBottom: `1px solid ${theme.palette.grey[200]}`
    },
    title: {
      fontSize: '0.75rem',
      color: theme.palette.grey[500]
    },
    value: {
    }
  })
);

interface Props {
  dataSource: any[][]
}

export default ({dataSource}: Props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {
        dataSource.map((items: any[], i: number) => {
          return (
            items.length === 0 ? '':
            <Grid item xs={12} key={i}>
              <Grid container spacing={3} className={classes.row}>
                {
                  items.map((item, j: number) => {
                    const {xs=(12/items.length), title, value} = item;
                    return (
                    <Grid item xs={xs} key={j}>
                      <Grid container spacing={1}>
                        {
                          title &&
                          <Grid item xs={12} className={classes.title}>
                            {title}
                          </Grid>
                        }
                        {
                          value &&
                          <Grid item xs={12} className={classes.value}>
                            {value}
                          </Grid>
                        }
                      </Grid>
                    </Grid>
                    )
                  })
                }
              </Grid>
            </Grid>
          )
        })
      }
    </Grid>
  );
}
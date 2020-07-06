import React from 'react';
import Card from '../card-left-to-right'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: `0 ${theme.spacing(2)+2}px`,
    marginBottom: 0,
  },
  headerCell: {
    fontSize: '0.75rem'
  },
  cell: {
    fontSize: '0.875rem'
  },
  operate:{
    float: 'right',
    marginTop: '-58px',
    marginRight: theme.spacing(2),
  }
}));

interface Props {
  headers: any[],
  showHeader?: boolean,
  className?: string,
  operateWidth?: string|number,
  dataSource: any[],
  operate?: Function
  onItemClick?: (data: any) => void
}

export default ({operate, operateWidth, onItemClick, headers, showHeader=true, dataSource, className}: Props) => {
  const classes = useStyles();

  return (
    <div className={className}>
      {
        showHeader &&
        <Grid container justify="space-between" spacing={2} className={classes.header}>
          {
            headers.map((h: any) => {
              return <Grid item xs={h.xs} key={h.key}><Typography color={"textSecondary"} className={classes.headerCell}>{h.name}</Typography></Grid>;
            })
          }
        </Grid>
      }
      {
        dataSource.map((d: any, i: number) => {
          return (
            <React.Fragment key={d.id || i}>
              <Card onClick={() => onItemClick && onItemClick(d)}>
                <Grid container justify="space-between" spacing={2}>
                  {
                    headers.map((h: any) => {
                      return (
                        <Grid item xs={h.xs} key={h.key}>
                          {
                            h.renderer ?
                            h.renderer(d[h.key], d)
                            :
                            <Typography color={h.color} noWrap className={classes.cell}>{d[h.key]}</Typography>
                          }
                        </Grid>
                      )
                    })
                  }
                </Grid>
                <div style={{width: operateWidth}}/>
              </Card>
              <div className={classes.operate}>
                {operate && operate(d)}
              </div>
            </React.Fragment>
          )
        })
      }
    </div>
  )
}
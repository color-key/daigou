import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from './table';
import { SearchStateType } from '.';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

interface Props{
  search: SearchStateType
  belongId?: string
}

export default ({search, belongId}: Props) => {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <div className={classes.root}>
      <Table search={search} belongId={belongId}/>
    </div>
  );
}

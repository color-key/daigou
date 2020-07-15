import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Table from './table';
import Search from './search';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default () => {
  const classes = useStyles();
  const [state, setState] = React.useState<SearchStateType>({contactName: '', contactPhone: '', website: ''});

  const handleSearch = (searchState: SearchStateType) => {
    setState(searchState);
  }

  return (
    <div className={classes.root}>
      <Search onSearch={handleSearch}/>
      <Table search={state}/>
    </div>
  )
}

export interface SearchStateType {
  contactName: string
  contactPhone: string
  website: string
}

export interface DemandType{
  id: number
  contactName: string
  contactPhone: string
  website: string,
  createTime: string,
}
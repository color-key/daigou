import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Tabs from './tabs';
import Search from './search';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

interface Props{
  belongId?: string
}

export default ({belongId}: Props) => {
  const classes = useStyles();
  const [state, setState] = React.useState<SearchStateType>({searchKeywords: ''});

  const handleSearch = (searchState: SearchStateType) => {
    setState(searchState);
  }

  return (
    <div className={classes.root}>
      <Search onSearch={handleSearch}/>
      <Tabs search={state} belongId={belongId}/>
    </div>
  )
}

export interface SearchStateType {
  searchKeywords: string
}

export interface BlogType{
  id: number
  title: string
  keywords: string
  description: string
  thumbnail: string
  content: string
  createTime: string
  updateTime: string
}
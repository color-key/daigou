import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Layout from '../../layout';
import Test from '../../test';
import ComingSoon from '../../coming-soon';
import {getPathnameArray} from "@/lib/router";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      overflow: 'hidden'
    },
  }),
);

export default () => {
  const classes = useStyles({});

  const [pathPrefix] = getPathnameArray();

  const router:any = {
    '': 'home loading',
    'test': <Layout><Test/></Layout>,
    'coming-soon': <Layout><ComingSoon/></Layout>,
  };

  return (
    <div className={classes.root}>
      {router[pathPrefix] || router['coming-soon']}
    </div>
  )
}

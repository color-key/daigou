import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {postJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleDeploy = () => {
    setLoading(true);
    postJson({path: BASE_URL+'/github/run'}).then(res => {
      console.log(res);
    })
  }

  return (
    <div className={classes.root}>
      <Button disabled={loading} onClick={handleDeploy} variant={"contained"} color={"primary"}>部署</Button>
    </div>
  )
}

import React from 'react';
import {useHistory} from 'react-router-dom';

export default () => {

  const history = useHistory();

  React.useEffect(() => {
    history.goBack();
  }, []);

  return <span/>
}

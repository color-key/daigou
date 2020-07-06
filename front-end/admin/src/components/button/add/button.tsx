import React from 'react';
import Fab, {FabProps} from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ReactDOM from "react-dom";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      position: 'fixed',
      right: theme.spacing(3),
      bottom: theme.spacing(3),
      width: 56,
      height: 56,
      // color: theme.palette.primary.main,
      // backgroundColor: theme.palette.common.white,
      animation: "$componentsButtonAdd 1s",
      // '&:hover': {
      //   color: theme.palette.common.white,
      //   backgroundColor: theme.palette.primary.main,
      // }
    },
    "@keyframes componentsButtonAdd": {
      "0%": {
        width: '0',
        height: '0',
        opacity: "0"
      },
      "100%": {
        width: 56,
        height: 56,
        opacity: "1"
      }
    },
  }),
);

export default ({className, ...props}: FabProps) => {
  const classes = useStyles();

  const dom = document.getElementById('app');
  return dom && ReactDOM.createPortal(
    <Fab color="primary" className={clsx(classes.button, className)} {...props}>
      <AddIcon />
    </Fab>
  , dom);
};

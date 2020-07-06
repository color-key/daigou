import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import WinMinimize from '@/components/icons/win-minimize';
import WinMaxIcon from '@/components/icons/win-max';
import WinReduceIcon from '@/components/icons/win-reduce';
import WinCloseIcon from '@/components/icons/win-close';
import browserWindow from "@/lib/electron-ipc-renderer/browser-window";
import clsx from 'clsx';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right: '32px',
      top: '16px',
      zIndex: 2,
      '-webkit-app-region': 'no-drag',
    },
    hidden: {
      display: 'none'
    },
    iconButton: {
      // height: 30,
      minWidth: '24px',
      width: '24px',
      margin: theme.spacing(0, 0.5),
      padding: theme.spacing(0, 1),
      // borderRadius: 0,
    }
  })
);

export default () => {
  const classes = useStyles();
  const [fullScreen, setFullScreen] = React.useState(false);

  const close = () => {
    browserWindow.setWindowsClose();
  };

  const min = () => {
    browserWindow.setWindowsMin();
  };

  const full = () => {
    browserWindow.toggleFullscreen();
  };

  React.useEffect(() => {
    window.onresize = () => {
      setFullScreen(browserWindow.isFullScreen());
    };
  }, []);

  return (
    <div className={classes.root}>
      <Button className={classes.iconButton} onClick={min}>
        <WinMinimize/>
      </Button>
      <Button className={clsx(classes.iconButton, {[classes.hidden]: fullScreen})} onClick={full}>
        <WinMaxIcon/>
      </Button>
      <Button className={clsx(classes.iconButton, {[classes.hidden]: !fullScreen})} onClick={full}>
        <WinReduceIcon/>
      </Button>
      <Button className={classes.iconButton} onClick={close}>
        <WinCloseIcon/>
      </Button>
    </div>
  )
}
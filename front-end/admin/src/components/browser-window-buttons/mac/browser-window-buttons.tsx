import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import MacCloseIcon from '@/components/icons/mac-close';
import MacCloseHoverIcon from '@/components/icons/mac-close-hover';
import MacMinimizeIcon from '@/components/icons/mac-minimize';
import MacMinimizeHoverIcon from '@/components/icons/mac-minimize-hover';
import MacFullscreenIcon from '@/components/icons/mac-fullscreen';
import MacFullscreenHoverIcon from '@/components/icons/mac-fullscreen-hover';
import browserWindow from "@/lib/electron-ipc-renderer/browser-window";
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: '22px',
      marginLeft: theme.spacing(0.5),
      zIndex: 999999,
    },
    icon: {
      fontSize: '0.75rem',
      marginLeft: theme.spacing(1)
    },
    hidden: {
      display: 'none'
    }
  })
);

export default () => {
  const classes = useStyles();
  const [closeHover, setCloseHover] = React.useState(false);
  const [minHover, setMinHover] = React.useState(false);
  const [fullHover, setFullHover] = React.useState(false);
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
      <MacCloseIcon className={clsx(classes.icon, {[classes.hidden]: closeHover})} onClick={close} onMouseOver={() => setCloseHover(true)}/>
      <MacCloseHoverIcon className={clsx(classes.icon, {[classes.hidden]: !closeHover})} onClick={close} onMouseLeave={() => setCloseHover(false)}/>
      <MacMinimizeIcon className={clsx(classes.icon, {[classes.hidden]: minHover || fullScreen})} onClick={min} onMouseOver={() => setMinHover(true)}/>
      <MacMinimizeHoverIcon className={clsx(classes.icon, {[classes.hidden]: !minHover || fullScreen})} onClick={min} onMouseLeave={() => setMinHover(false)}/>
      <MacFullscreenIcon className={clsx(classes.icon, {[classes.hidden]: fullHover})} onClick={full} onMouseOver={() => setFullHover(true)}/>
      <MacFullscreenHoverIcon className={clsx(classes.icon, {[classes.hidden]: !fullHover})} onClick={full} onMouseLeave={() => setFullHover(false)}/>
    </div>
  )
}
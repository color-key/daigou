import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import HttpsIcon from '@material-ui/icons/Https';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import clsx from 'clsx';
import {useSelector} from 'react-redux';
import reducerName from "@/root/reducerName";
import {getLocale} from "./locale";
import device from "@/lib/electron-ipc-renderer/device";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      margin: '-12px 0'
      // fontSize: '14px'
    },
    disconnected: {
      backgroundColor: theme.palette.secondary.main,
    },
    text: {
      margin: theme.spacing(0, 2)
    },
    loadingLock: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    loading: {
      color: theme.palette.common.white,
    },
    lock: {
      position: 'absolute',
      width: 16,
      heigth: 16
    },
    button: {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(0, 4)
    },
    right: {
      margin: theme.spacing(0, 4)
    }
  }),
);

interface Props {
  onDeviceConfirm?: () => void;
  onDeviceConfirmCancel?: () => void;
}

let timeout: NodeJS.Timeout|null = null;
export default ({onDeviceConfirm, onDeviceConfirmCancel}: Props) => {
  const classes = useStyles();
  const localeLangData = getLocale().lang;

  const root = useSelector((state: any) => state[reducerName]);
  const {connect: deviceConnect} = root;

  React.useEffect(() => {
    if(deviceConnect){
      onDeviceConfirm && device.done();
      timeout = setTimeout(() => {
        onDeviceConfirm && onDeviceConfirm();
      }, 1000);
    }
    return () => {
      timeout && clearTimeout(timeout);
      onDeviceConfirm && device.done();
    }
  }, [deviceConnect]);

  return (
    <div className={clsx(classes.root, {[classes.disconnected]: !deviceConnect})}>
      <div className={classes.left}>
        <ImportantDevicesIcon/>
        {
          deviceConnect ?
          <Typography className={classes.text} variant={"body2"}>{localeLangData.confirm}…</Typography>
          :
          <Typography className={classes.text} variant={"body2"}>{localeLangData.disconnect}</Typography>
        }
        <div className={classes.loadingLock}>
          <CircularProgress className={classes.loading} size={24}/>
          <HttpsIcon className={classes.lock}/>
        </div>
      </div>
      <div className={classes.right}>
        <Button variant={"outlined"} className={classes.button} onClick={onDeviceConfirmCancel} size='small'>
          {localeLangData.cancel}
        </Button>
      </div>
    </div>
  );
}
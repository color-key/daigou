import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import device from "@/lib/electron-ipc-renderer/device";
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import {getLocale} from "../locale";

const useStyles = makeStyles((theme) =>
  createStyles({
    left: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      marginRight: theme.spacing(2)
    },
    icon: {
      marginRight: theme.spacing(2)
    },
  })
);

interface Props {
  notCancel?: boolean;
  deviceConnect?: boolean;
  error?: boolean;
  onClose: () => void;
  text?: string
  cancelText?: string,
  onDeviceConfirm?: () => void;
  root?: {
    connect: boolean
  }
}

let timeout: NodeJS.Timeout|null = null;
export default ({ error, onDeviceConfirm, onClose, text, cancelText='', notCancel=false, deviceConnect }: Props) => {
  const classes = useStyles();
  const localeLangData = getLocale().lang;

  const handleClose = () => {
    onClose();
    device.done();
  };

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
    <>
      <div className={classes.left}>
        <SmartphoneIcon className={classes.icon}/>
        {
          (deviceConnect || error) ?
          <Typography variant={"inherit"}>{text || ''}</Typography>
          :
          <Typography variant={"inherit"}>{localeLangData.disconnect || ''}</Typography>
        }
      </div>
      {notCancel || <Button size={'small'} color={'inherit'} variant={'outlined'} onClick={handleClose}>{cancelText || localeLangData.cancel}</Button>}
    </>
  );
}

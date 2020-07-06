import React from 'react';
import Dialog from "@/components/dialog/loading-dialog";
import device from "@/lib/electron-ipc-renderer/device";
import reducerName from "@/root/reducerName";
import {useSelector} from "react-redux";
import DeviceConfirm from './device-confirm';

interface Props {
  open: boolean;
  notCancel?: boolean;
  error?: boolean;
  onClose: () => void;
  text?: string
  cancelText?: string,
  onDeviceConfirm?: () => void;
}

export default ({ onDeviceConfirm, onClose, open, text, cancelText, notCancel=false, error=false }: Props) => {

  const root = useSelector((state: any) => state[reducerName]);
  const {connect: deviceConnect} = root;

  const handleClose = () => {
    onClose();
    device.done();
  };
  return (
    <Dialog
      error={(error || !deviceConnect) && open}
      onClose={handleClose}
      open={open}
    >
      {open && <DeviceConfirm error={error} deviceConnect={deviceConnect} onClose={handleClose} onDeviceConfirm={onDeviceConfirm} text={text} cancelText={cancelText} notCancel={notCancel}/>}
    </Dialog>
  );
}

import React from 'react';
import device from '@/lib/electron-ipc-renderer/device';
import Card from "./card";
import Empty from "./empty";
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import {Device} from './index';

let mount = false;
export default ({disabled, onSelect}: any) => {

  const [devices, setDevices] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState<Device|null>(null);

  const selectDevice = (d: string) => {
    setSelectedDevice(JSON.parse(d));
    onSelect(JSON.parse(d));
  };

  React.useEffect(() => {
    mount = true;
    device.startDiscovering();
    device.discover((_event: any, arg: string) => {
      const discoveredDevices = JSON.parse(arg);
      if(mount){
        setDevices(discoveredDevices);
      }
    });
    return () => {
      mount = false;
      device.stopDiscovering();
    }
  }, []);

  React.useEffect(() => {
    const devicesSerialNumber = devices.map((d: Device) => d.serialNumber);
    if(!disabled && selectedDevice !== null && !devicesSerialNumber.includes(selectedDevice.serialNumber)){
      setSelectedDevice(null);
      onSelect(null);
    }
  }, [JSON.stringify(devices), disabled]);

  if(disabled && selectedDevice){
    return <Card key={selectedDevice.serialNumber} icon={<SmartphoneIcon/>} primary={selectedDevice.name} secondary={'ID:'+selectedDevice.serialNumber}/>;
  }else if(devices.length === 0){
    return <Empty/>;
  }else{
    return (
      <>
        {
          devices.map((d: Device) => {
            return <Card key={d.serialNumber} selected={selectedDevice?selectedDevice.publicKey===d.publicKey:false} icon={<SmartphoneIcon/>} primary={d.name} secondary={'ID:'+d.serialNumber} onClick={() => selectDevice(JSON.stringify(d))}/>;
          })
        }
      </>
    )
  }
}

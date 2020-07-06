import os from "./os";
import device from "./device";

export const backup = () => {
  console.log('parseBackupData: getInfo start');
  os.getInfo(({ id, hostname }: any) => {
    console.log('parseBackupData: getKeyAuth start');
    os.getKeyAuth((authInfo: any) => {
      console.log('parseBackupData: getKeyAuth succ');
      device.parseBackupData([{
        encryptedData: authInfo && authInfo.encryptedData ? authInfo.encryptedData : '',
        deviceName: hostname,
        timestamp: authInfo && authInfo.time ? authInfo.time : undefined,
        id
      }])
    });
  });
};
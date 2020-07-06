import React from 'react';
import {postJson} from '@fay-react/lib/fetch';
import Dialog from "../../../index";
import device from "@/lib/electron-ipc-renderer/device";
import Edit,{ValueType} from './edit';
import {useLocale} from "../../../../locale";
import {Locale} from "../locale";
import {getErrorMessage} from "@/lib/fetch-error";
import keyAuthConfirm from "@/lib/electron-ipc-renderer/keyAuth-confirm";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

let values: (ValueType | null) = null;

export default ({ onClose, open, onSuccess }: Props) => {
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [deviceConfirm, setDeviceConfirm] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const localeLangData = useLocale<Locale>().lang;

  const handleClose = () => {
    onClose();
    device.done();
    setDeviceConfirm(false);
    setLoading(false);
    setFinish(false);
  };

  const handleChange = (w: (ValueType|null)) => {
    if(w){
      values = w;
      setSubmitDisabled(false);
    }else{
      values = null;
      setSubmitDisabled(true);
    }
  };

  const handleDeviceConfirmCancel = () => {
    device.done();
    setDeviceConfirm(false);
    setLoading(false);
  };

  const handleSubmit = () => {
    if(values){
      setLoading(true);
      setDeviceConfirm(true);
    }
  };

  const handleDeviceConfirm = async () => {
    const {name, email, phone, device: d} = values!;
    const {publicKey, serialNumber, name: deviceName} = JSON.parse(d!);
    const {confirm, data: keyAuthConfirmResult, done} = await keyAuthConfirm.addMember([name, email, publicKey, phone ? phone : '', serialNumber, deviceName ? deviceName : '']);
    if(done) return;
    setDeviceConfirm(false);
    if(confirm){
      const [certificate, signature] = keyAuthConfirmResult;
      const data = {
        name,
        mobileNo: phone,
        email,
        publicKey,
        deviceId: serialNumber,
        basicSignature: {
          signature,
          certificate,
        },
      };
      postJson({path: baseUrl.malygos() + '/v2/addMember', data}).then((res) => {
        if(res.status === 0){
          setLoading(false);
          setFinish(true);
          onSuccess && onSuccess();
        }else{
          getErrorMessage(res).then((errorMsg) => {
            setError(errorMsg);
          });
        }
      })
    }else{
      device.done();
      setLoading(false);
    }
  };

  const handleError = () => {
    device.done();
    setError('');
    setLoading(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      title={localeLangData.title}
      onSubmit={handleSubmit}
      submitDisabled={submitDisabled}
      deviceConfirm={deviceConfirm}
      finishText={finish?localeLangData.finish:''}
      errorText={error}
      loading={loading}
      buttonVariant={['cancel', 'submit']}
      onFinish={handleClose}
      onError={handleError}
      onDeviceConfirm={handleDeviceConfirm}
      onDeviceConfirmCancel={handleDeviceConfirmCancel}
    >
      <Edit onChange={handleChange} disabled={loading}/>
    </Dialog>
  );
}
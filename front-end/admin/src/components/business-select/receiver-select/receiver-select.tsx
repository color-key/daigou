import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {getJson} from '@fay-react/lib/fetch';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import node from '@/lib/electron-ipc-renderer/node'
import {Receiver, Address} from './index';
import Grid from '@material-ui/core/Grid';
import CurrencyTextIcon from '../../currency/text-icon';
import TextField from "@/components/text-field";
import {getLocale} from "./locale";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // margin: theme.spacing(1.5, 0, 3, 0)
    }
  })
);

interface Props {
  currency: {
    name: string,
    path?: number[],
    publicKey?: string
  },
  value: string,
  onChange: (v: Receiver|null, fromAddress?: string) => void,
  excludes?: string[]
  disabled?: boolean
}

const sort = (s1: any, s2: any) => {
  if (s1.id < s2.id) return -1;
  return 1;
};

export default ({ currency, value, onChange, excludes=[], disabled }: Props) => {
  const classes = useStyles();
  const localeLabels = getLocale().labels;
  const [outReceivers, setOutReceivers] = React.useState<Receiver[]>([]);
  const [innerReceivers, setInnerReceivers] = React.useState<Receiver[]>([]);
  const [catalog, setCatalog] = React.useState<number>(0);
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const [outAddressList, setOutAddressList] = React.useState<Address[]>([]);
  const [selectedValue, setSelectedValue] = React.useState(value);

  React.useEffect(() => {
    setSelectedValue(value);
    if(value.length === 0){
      setSelectedAddress('');
    }
  }, [value]);

  const handleChangeCatalog = (v: string) => {
    setSelectedAddress('');
    setSelectedValue('');
    setCatalog(Number.parseInt(v, 10));
    onChange(null);
  };

  const handleChangeReceiver = (v: string) => {
    if(catalog === 0){
      const receiver: Receiver = innerReceivers.filter((r) => r.id === v)[0];
      const {addressList} = receiver;
      const address = addressList.filter((a) => a.name === currency.name)[0];
      if(address){
        node.getAddress({publicKey: address.publicKey, type: address.path![0]}, (getToAddressRes: any) => {
          const getToAddress = getToAddressRes.data.address;
          setSelectedAddress(getToAddress);
          receiver.address = getToAddress;
          if(currency.path && currency.publicKey){
            node.getAddress({publicKey: currency.publicKey, type: currency.path![0]}, (getFromAddressRes: any) => {
              receiver.fromAddress = getFromAddressRes.data.address;
              onChange(receiver);
            })
          }
        })
      }else{
        setSelectedValue(v);
        setSelectedAddress(localeLabels[0]);
      }
    }else if(catalog === 1){
      const receiver: Receiver = outReceivers.filter((r) => r.id === v)[0];
      setSelectedValue(v);
      setOutAddressList([]);
      setSelectedAddress('');
      onChange(receiver);
      getJson({path: baseUrl.malygos() + '/getDataOuterContact', data: {id: receiver.id}}).then((res) => {
        if(res.status === 0){
          node.verifyPayeeAddressInfo({payeeAddressAndSignature: res.payeeAddressAndSignature}, (verifyPayeeAddressInfoRes: any) => {
            const verifyPayeeAddress: string[] = verifyPayeeAddressInfoRes.data.addressList.map((info: any) => info.address);
            const addressList = receiver.addressList.filter((a) =>
              (a.coinSymbol === currency.name) && verifyPayeeAddress.includes(a.address)
            );
            if(addressList.length === 0){
              return;
            }
            setOutAddressList(addressList);
            const address = addressList[0].address;
            setSelectedAddress(address);
            receiver.address = address;
            if(currency.path && currency.publicKey){
              node.getAddress({publicKey: currency.publicKey, type: currency.path![0]}, (getFromAddressRes: any) => {
                receiver.fromAddress = getFromAddressRes.data.address;
                onChange(receiver);
              })
            }
          });
        }
      })
    }
  };

  const handleChangeAddress = (v: string) => {
    setSelectedAddress(v);
    const receiver: Receiver = outReceivers.filter((r) => r.id === selectedValue)[0];
    receiver.address = v;
    if(currency.path && currency.publicKey){
      node.getAddress({publicKey: currency.publicKey, type: currency.path![0]}, (getFromAddressRes: any) => {
        receiver.fromAddress = getFromAddressRes.data.address;
        onChange(receiver);
      })
    }
  };

  React.useEffect(() => {
    setSelectedAddress('');
    setSelectedValue('');
    getJson({path: baseUrl.malygos() + '/walletContactCustomerBook'}).then(res => {
      setOutReceivers(res.contractCustomerBook.filter((v: any) => !excludes.includes(v.id) && v.addressList.filter((l:any) => l.coinSymbol === currency.name).length>0));
    });
    getJson({path: baseUrl.malygos() + '/getDataInnerContact'}).then(res => {
      setInnerReceivers(res.walletInfoAndSignature.filter((r: any) => !excludes.includes(r.id+'') && r.addressList.filter((l:any) => l.name === currency.name).length>0).sort(sort));
    });
  }, [currency.name, JSON.stringify(excludes)]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Select label={localeLabels[1]} value={catalog} onChange={handleChangeCatalog} disabled={disabled}>
            <MenuItem value={0}>{localeLabels[2]}</MenuItem>
            <MenuItem value={1}>{localeLabels[3]}</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select label={localeLabels[4]} value={selectedValue} onChange={handleChangeReceiver} disabled={disabled}>
            {
              catalog === 0 && innerReceivers.map((c: any) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
            }
            {
              catalog === 1 && outReceivers.map((c: any) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
            }
          </Select>
        </Grid>
          {
            catalog === 0 &&
            selectedAddress.length > 0 &&
            <Grid item xs={12}>
              <TextField label={localeLabels[5]} fullWidth value={selectedAddress} disabled/>
            </Grid>
          }
          {
            catalog === 1 &&
            <Grid item xs={12}>
              <Select label={localeLabels[5]} value={selectedAddress} onChange={handleChangeAddress} disabled={disabled}>
                {
                  outAddressList.map((address: Address) => (
                    <MenuItem key={address.id} value={address.address}>
                      <div>
                        <CurrencyTextIcon type={address.coinSymbol}/>
                        <Typography variant={"body2"} color={"textSecondary"} noWrap>{address.label}</Typography>
                        <Typography variant={"body2"} color={"textSecondary"} noWrap>{address.address}</Typography>
                      </div>
                    </MenuItem>
                  ))
                }
              </Select>
            </Grid>
          }
      </Grid>
    </div>
  );
}
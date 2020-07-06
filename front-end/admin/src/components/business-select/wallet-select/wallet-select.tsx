import React from 'react';
import {getJson} from '@fay-react/lib/fetch';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import {Wallet} from './index';
import {getErrorMessage} from "@/lib/fetch-error";
import {getWalletPrivilege, WalletPrivilege} from "@/lib/privilege/wallet";
import {getPrivilege, Privilege} from "@/lib/privilege";

interface Props {
  label: string,
  value: number,
  disabled?: boolean,
  transfer?: boolean,
  onChange: (id: number, wallet: Wallet) => void
}

const sort = (s1: any, s2: any) => {
  if (s1.walletId < s2.walletId) return -1;
  return 1;
};

export default ({ label, value, disabled, onChange, transfer }: Props) => {
  const [wallets, setWallets] = React.useState<Wallet[]>([]);

  const transferWalletList = (walletList: Wallet[]) => {
    const _wallets: Wallet[] = [];
    walletList.map((w: Wallet) => {
      const walletPrivilege: WalletPrivilege = getWalletPrivilege(w.walletId);
      const privilege: Privilege = getPrivilege();
      if(walletPrivilege.transfer || privilege["/wallet-list"].transfer){
        _wallets.push(w);
      }
    });
    return _wallets;
  };

  React.useEffect(() => {
    getJson({path: baseUrl.malygos() + '/subWalletList?walletStatus=created'}).then(res => {
      if(res.status === 0){
        let _wallets: Wallet[] = [];
        if(transfer) {
          _wallets = transferWalletList(res.wallets);
        }else{
          _wallets = res.wallets;
        }
        setWallets(_wallets.sort(sort));
        const selectWallet = _wallets.filter((w: Wallet) => w.walletId === value)[0];
        if(_wallets.length > 0 && selectWallet) {
          onChange(value, selectWallet);
        }
      }else{
        getErrorMessage(res).then((_errorMsg) => {
          // error
        });
      }
    });
  }, []);

  const handleChangeWallet = (v: string) => {
    const id = Number.parseInt(v, 10);
    onChange(id, wallets.filter((w: Wallet) => w.walletId === id)[0]);
  };

  return (
    <Select label={label} value={wallets.length>0?value:''} onChange={handleChangeWallet} disabled={disabled}>
      {
        wallets.map((w: Wallet) => <MenuItem key={w.walletId} value={w.walletId}>{w.walletName}</MenuItem>)
      }
    </Select>
  );
}
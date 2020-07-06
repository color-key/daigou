import {getUser} from '../../user';
import {privilege, privilegeSchema, WalletPrivilege as _WalletPrivilege} from './data';

export const getWalletPrivilege = (id: number) => {
  const user = getUser();
  const wallets = user.wallets;
  const privileges = wallets.filter((w: any) => w.walletId === id).map((w: any) => privilege[w.roleType]);
  const _privilegeSchema = {...privilegeSchema};
  privileges.map((res: any) => {
    Object.keys(_privilegeSchema).map((key: string) => {
      const v = res[key];
      v && (_privilegeSchema[key] = v);
    })
  });
  return _privilegeSchema;
};

export type WalletPrivilege = _WalletPrivilege;
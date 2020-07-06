import {getJson} from '@fay-react/lib/fetch';
import {getUser} from '../user';
import immutable from 'immutable';
import {getAssetsPublicPath} from "@/lib/router";

const key = 'privilege';
const privilegeSchema: any = {
  "nav": {
    "/dashboard": false,
    "/workbench": false,
    "/wallet-list": false,
    "/receipt-persons": false,
    "/setting": false,
    "/statistics": false
  },
  "/wallet-list": {
    "add": false,
    "audit": false,
    "addCurrency": false,
    "transfer": false,
    "receive": false,
    "setting": false,
    "infoEdit": false,
    "limitEdit": false,
    "priKeyHoldersEdit": false,
    "priKeyHoldersReset": false,
    "managersEdit": false,
    "transferAndReceiveAuditorsEdit": false,
    "readPersonsEdit": false,
    "archive": false,
    "unArchived": false,
    "viewArchived": false
  },
  "/receipt-persons": {
    "add": false,
    "audit": false,
    "edit": false,
    "remove": false
  },
  "/setting": {
    "orgTab": false,
    "memberTab": false,
    "keyAuthTab": false,
    "systemTab": false,
    "mainManagersEdit": false,
    "subManagersEdit": false,
    "priKeyHoldersEdit": false,
    "auditPriKeyHoldersEdit": false,
    "defaultCurrencyEdit": false,
    "addMember": false,
    "editMember": false,
    "removeMember": false,
    "priKeyBackup": false
  }
};

const walletOperateRoles = ['walletKeyHolder', 'walletManager', 'chargeManager'];
const walletViewerRoles = ['walletViewer'];

const promiseObj: any = {
  "mainManager": getJson({path: getAssetsPublicPath() + '/data/privilege/mainManager.json'}),
  "subManager": getJson({path: getAssetsPublicPath() + '/data/privilege/subManager.json'}),
  "managerKeyHolder": getJson({path: getAssetsPublicPath() + '/data/privilege/managerKeyHolder.json'}),
  "common": getJson({path: getAssetsPublicPath() + '/data/privilege/common.json'}),
  "wallet": getJson({path: getAssetsPublicPath() + '/data/privilege/wallet.json'}),
  "walletViewer": getJson({path: getAssetsPublicPath() + '/data/privilege/walletViewer.json'}),
};

export const savePrivilege = (privilege: {}) => {
  window.sessionStorage.setItem(key, JSON.stringify(privilege));
};

export const removePrivilege = () => {
  window.sessionStorage.removeItem(key);
};


export const getPrivilege = () => {
  const privilege = window.sessionStorage.getItem(key);
  return privilege && JSON.parse(privilege);
};

export const downloadPrivilege = () => {
  const user = getUser();
  const roles = user.roles;
  const walletRoles = user.walletRoles;
  let hasWalletRole = false;
  let hasWalletViewerRole = false;
  const promiseArr = roles.map((role: Role) => promiseObj[role.type]);
  for(const r of walletRoles){
    if(walletOperateRoles.includes(r.type)){
      promiseArr.push(promiseObj.wallet);
      hasWalletRole = true;
      break;
    }
    if(walletViewerRoles.includes(r.type)){
      hasWalletViewerRole = true;
    }
  }
  if(!hasWalletRole && hasWalletViewerRole){
    hasWalletRole = true;
    promiseArr.push(promiseObj.walletViewer);
  }
  const _privilegeSchema = immutable.fromJS(privilegeSchema).toJS();
  return new Promise<string>((resolve, reject) => {
    Promise.all(promiseArr).then((responses) => {
      if(roles.length === 1 && roles[0].type === 'common' && !hasWalletRole){
        resolve('/no-privilege');
      }else{
        responses.map((res: any) => {
          Object.keys(_privilegeSchema).map((mainKey: string) => {
            Object.keys(_privilegeSchema[mainKey]).map((subKey: string) => {
              const v = res[mainKey][subKey];
              v && (_privilegeSchema[mainKey][subKey] = v);
            })
          })
        });
        savePrivilege(_privilegeSchema);
        if(_privilegeSchema.nav["/dashboard"]){
          resolve("/dashboard");
        }else if(_privilegeSchema.nav["/workbench"]){
          resolve("/workbench");
        }else if(_privilegeSchema.nav["/wallet-list"]){
          resolve("/wallet-list");
        }else if(_privilegeSchema.nav["/receipt-persons"]){
          resolve("/receipt-persons");
        }else if(_privilegeSchema.nav["/setting"]){
          resolve("/setting");
        }else if(_privilegeSchema.nav["/statistics"]){
          resolve("/statistics");
        }else{
          resolve('/no-privilege');
        }
      }
    }).catch((err) => {
      reject(err);
    })
  });
};

export interface Role {
  type: string
}

export interface Privilege {
  "nav": {
    "/dashboard": boolean,
    "/workbench": boolean,
    "/wallet-list": boolean,
    "/receipt-persons": boolean,
    "/setting": boolean,
    "/statistics": boolean
  },
  "/wallet-list": {
    "add": boolean,
    "audit": boolean,
    "addCurrency": boolean,
    "transfer": boolean,
    "receive": boolean,
    "setting": boolean,
    "infoEdit": boolean,
    "limitEdit": boolean,
    "priKeyHoldersEdit": boolean,
    "priKeyHoldersReset": boolean,
    "managersEdit": boolean,
    "transferAndReceiveAuditorsEdit": boolean,
    "readPersonsEdit": boolean,
    "archive": boolean,
    "unArchived": boolean,
    "viewArchived": boolean
  },
  "/receipt-persons": {
    "add": boolean,
    "audit": boolean,
    "edit": boolean,
    "remove": boolean
  },
  "/setting": {
    "orgTab": boolean,
    "memberTab": boolean,
    "keyAuthTab": boolean,
    "systemTab": boolean,
    "mainManagersEdit": boolean,
    "subManagersEdit": boolean,
    "priKeyHoldersEdit": boolean,
    "auditPriKeyHoldersEdit": boolean,
    "defaultCurrencyEdit": boolean,
    "addMember": boolean,
    "editMember": boolean,
    "removeMember": boolean,
    "priKeyBackup": boolean
  }
}
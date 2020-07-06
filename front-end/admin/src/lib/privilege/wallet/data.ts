const walletKeyHolder = {
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
};

const walletManager = {
  "add": false,
  "audit": false,
  "addCurrency": true,
  "transfer": true,
  "receive": true,
  "setting": true,
  "infoEdit": true,
  "limitEdit": true,
  "priKeyHoldersEdit": true,
  "priKeyHoldersReset": true,
  "managersEdit": false,
  "transferAndReceiveAuditorsEdit": true,
  "readPersonsEdit": true,
  "archive": false,
  "unArchived": false,
  "viewArchived": true
};

const chargeManager = {
  "add": false,
  "audit": false,
  "addCurrency": true,
  "transfer": true,
  "receive": true,
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
};

const walletViewer = {
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
};

export const privilege: any = {
  walletKeyHolder,
  walletManager,
  chargeManager,
  walletViewer
};

export const privilegeSchema: any = {
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
};

export interface WalletPrivilege {
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
}
import {getJson, postJson} from '@fay-react/lib/fetch';
import keyAuthFetch from '@/lib/electron-ipc-renderer/keyAuth-fetch';
import {getUser} from '@/lib/user';
import {backup} from './electron-ipc-renderer/backup';

export const downloadKey = (walletId: number, todoItemId: string) => {
  const user = getUser();
  if (user && user.email) {
    if(walletId >= 0){
      downloadWalletKeyPiece(walletId, todoItemId);
    }else{
      downloadOrgKeyPiece(todoItemId);
    }
  }
};

export const downloadWalletKeyPiece = (walletId: number, todoItemId: string) => {
  getJson({path: baseUrl.malygos() + '/isNeedWalletKeyDownload?walletId='+walletId}).then(({ needDownload }) => {
    if(needDownload){
      postJson({path: baseUrl.malygos() + '/downloadWalletKeyPiece', data: {walletId, basicSignature: { certificate: "证书字符串", signature: "签名字符串" }}}).then(async res => {
        if(res.status === 0){
          const keyPiece = res.keyDownload.keyPiece;
          // [saved] = results;
          const [saved] = await keyAuthFetch.saveKeyPiece([walletId+'', keyPiece]);
          // device.saveKeyPiece([walletId+'', keyPiece], ({saved}:any) => {
          if(saved){
            downloadSuccess(walletId, todoItemId);
          }
          // })
        }
      })
    }
  })
};

export const downloadOrgKeyPiece = (todoItemId: string) => {
    postJson({path: baseUrl.malygos() + '/downloadOrgKeyPiece', data: {basicSignature: { certificate: "证书字符串", signature: "签名字符串" }}}).then(async res => {
      if(res.status === 0){
        const { keyPiece, walletId } = res.keyDownload;
        // [saved] = results;
        const [saved] = await keyAuthFetch.saveKeyPiece(['/', keyPiece]);
        // device.saveKeyPiece(['/', keyPiece], ({saved}: any) => {
        if(saved){
          downloadSuccess(walletId, todoItemId);
        }
        // })
      }
    })
};

const downloadSuccess = (walletId: number, todoItemId: string) => {
  postJson({path: baseUrl.malygos() + '/downloadKeyPieceSuccess', data: {walletId, basicSignature: { certificate: "证书字符串", signature: "签名字符串" }}}).then(res => {
    if(res.status === 0){
      postJson({path: baseUrl.malygos() + '/todoItemDeal?todoItemId='+todoItemId, data: {todoItemId}});
      if(!res.needDownload){
        backup();
      }
    }
  })
};
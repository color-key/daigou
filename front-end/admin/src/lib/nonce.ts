import {getJson} from '@fay-react/lib/fetch';
import {getErrorMessage} from "@/lib/fetch-error";

export const getNonce = (callback: (nonce: string) => void) => {
  getJson({path: baseUrl.malygos() + '/no-auth/component/nonce'}).then(res => {
    if(res.status === 0){
      callback(res.nonceVale);
    }else{
      getErrorMessage(res).then((_errorMsg) => {
        // error
      });
    }
  })
};
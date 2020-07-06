import {getLocale} from "./locale";

export const getStatusText = (status:string, confirmedBlockNum?:number) => {
  const localeLangData = getLocale().lang.data;
  switch (status) {
    case '0':
      return confirmedBlockNum?`${localeLangData[0][0]}${confirmedBlockNum}${localeLangData[0][1]}`:localeLangData[1];
    case '1':
      return localeLangData[2];
    case '5':
      return localeLangData[3];
    case '6':
      return localeLangData[3];
    case '9':
      return localeLangData[4];
    default:
      return localeLangData[1];
  }
};
import React from 'react';
import Dialog from './dialog';
import LocaleProvider from "../../../../provider/locale-provider";

export default (props: any) => {
  return (
    <LocaleProvider path={'/components/business-dialog/add-member-dialog/remote'}>
      <Dialog {...props}/>
    </LocaleProvider>
  );
}
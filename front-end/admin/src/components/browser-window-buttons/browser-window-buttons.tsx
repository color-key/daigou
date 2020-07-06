import React from 'react';
import MacBrowserWindowButtons from "./mac";
import WinBrowserWindowButtons from "./windows";
import {isMac} from '@fay-react/lib/os';

export default () => {
  return isMac ? <MacBrowserWindowButtons/> : <WinBrowserWindowButtons/>
}
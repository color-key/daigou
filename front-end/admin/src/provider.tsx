import React from 'react';
import Provider from '@fay-react/lib/provider';
import {RouteComponentProps} from "react-router-dom";
import ThemeProvider from '@/components/provider/theme-provider';
document.title = 'fay-editor';

interface Props {
  root: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

declare global {
  interface Window {
    scope: string
  }
}

window.scope = process.env.PUBLIC_PATH || '';

export default ({root}: Props) => {
  return (
    <ThemeProvider>
      <Provider root={root}/>
    </ThemeProvider>
  )
};

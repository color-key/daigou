import React from 'react';
import Provider from '@fay-react/lib/provider';
import { render } from '@testing-library/react'
import ThemeProvider from '@/components/provider/theme-provider';

document.title = 'keystore';

window.baseUrl = {
  malygos: () => window.sessionStorage.getItem('malygos') || '',
  malygosMain: 'api-malygos',
  malygosTest: 'api-trial-malygos',
  kmc: 'api-kmc'
};

const AllTheProviders = ({ children }: any) => {
  const Root = () => children;
  return (
    <ThemeProvider>
      <Provider root={Root}/>
    </ThemeProvider>
  )
};

const customRender = (ui: any, options: any=undefined) =>
render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

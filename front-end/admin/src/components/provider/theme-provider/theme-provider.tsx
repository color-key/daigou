import React from 'react';
import {blue} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0062FF',
      light: blue[50],
    },
    secondary: {
      main: '#D70D26'
    }
  },
  spacing: 8,
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 1px 5px 0px rgba(33,33,33,0.16), 0px 3px 1px -2px rgba(33,33,33,0.08), 0px 2px 2px 0px rgba(33,33,33,0.1)',
        marginLeft: '5px',
        marginRight: '5px'
      },
      rounded: {
        borderRadius: '2px'
      }
    },
    MuiSnackbar: {
      anchorOriginTopRight: {
        '@media (min-width: 600px)': {
          top: '60px',
          left: '200px',
        }
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: '15.7px 14px',
        fontSize: '0.875rem'
      }
    },
    MuiButton: {
      root: {
        textTransform: "inherit"
      }
    }
  }
});

const myTheme = {
  charts: {
    color: '#008AFF3D',
    series: {
      color: '#008AFF'
    },
    colors: {
      orange: {
        main: '#FFB33A',
        light: '#FFB33A3D'
      },
      skyBlue: {
        main: '#23B4FF',
        light: '#23B4FF3D'
      },
      purple: {
        main: '#B134FF',
        light: '#B134FF3D'
      },
      blue: {
        main: '#4278FF',
        light: '#4278FF3D'
      },
      cyan: {
        main: '#00CDF0',
        light: '#3BFFE33D'
      },
    }
  },
  colors: {
    blue: '#0062FF',
    skyBlue: "#23B4FF",
    green: '#0CC73B',
    red: '#D70D26',
    orange: '#FFA000',
    grey: '#BDBDBD',
    deepGrey: '#757575',
    purple: '#B134FF',
    cyan: '#00CDF0',
  }
};

interface Props {
  children: React.ReactNode;
}

export default ({children}: Props) => {
  return (
    <ThemeProvider theme={{...theme, ...myTheme}}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
};

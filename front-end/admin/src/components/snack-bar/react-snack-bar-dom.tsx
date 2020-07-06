import React, {SyntheticEvent} from 'react';
import ReactDom from 'react-dom';
import Snackbar from "./snack-bar";
import ThemeProvider from "@/components/provider/theme-provider";
import {variantIcon} from "@/components/snack-bar/content-wrapper";

const CustomSnackBar = ({id, message, autoHideDuration, variant, vertical, horizontal}: any) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar id={id} open={open} message={message} onClose={handleClose} autoHideDuration={autoHideDuration} variant={variant} vertical={vertical} horizontal={horizontal}/>
  )
};

interface SnackBar {
  variant?: keyof typeof variantIcon,
  autoHideDuration?: number,
  id?: string,
  message: string
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}

export const renderSnackBar = ({message, autoHideDuration, variant, vertical, horizontal, id}: SnackBar) => {
  if(id && document.getElementById(id)){
    return;
  }
  const dom = document.createElement('div');
  document.body.append(dom);
  ReactDom.render(<ThemeProvider><CustomSnackBar id={id} message={message} autoHideDuration={autoHideDuration} variant={variant} vertical={vertical} horizontal={horizontal}/></ThemeProvider>, dom);
};
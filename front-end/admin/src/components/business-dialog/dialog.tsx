import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import DeviceConfirm from '../device-confirm';
import Finish from './finish';
import Error from './error';
import clsx from 'clsx';
import {getLocale, Locale} from "./locale";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: 480
    },
    title: {
      padding: theme.spacing(4)
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    tabs: {
      marginBottom: theme.spacing(3.5),
    },
    content: {
      padding: theme.spacing(1, 4),
      marginBottom: theme.spacing(3.5),
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    footer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderTop: '1px solid rgba(238,238,238,1)',
    },
    footerLeft: {
      marginLeft: theme.spacing(4),
      alignSelf: 'center',
    },
    buttons: {
      height: 36,
      alignSelf: 'center',
      padding: theme.spacing(0, 4),
    },
    button: {
      marginLeft: theme.spacing(1),
      boxShadow: 'none'
    },
  })
);

export type ButtonVariant = 'cancel' | 'know' | 'confirm' | 'submit' | 'finish';

export interface Props extends DialogProps{
  open: boolean;
  onClose?: () => void;
  onDeviceConfirm?: () => void;
  onDeviceConfirmCancel?: () => void;
  tabs?: React.ReactElement | boolean;
  children: React.ReactNode;
  footerLeft?: React.ReactNode;
  footerComponent?: React.ReactNode;
  onSubmit?: () => void;
  onConfirm?: () => void;
  onError?: () => void;
  onFinish?: () => void;
  onKnow?: () => void;
  submitDisabled?: boolean;
  deviceConfirm?: boolean;
  loading?: boolean;
  footer?: boolean;
  errorText?: string;
  finishText?: string;
  submitText?: string;
  PaperProps?: {className: string};
  buttonVariant?: ButtonVariant[]
  locale?: Locale
}

export default ({
  onClose, open, title, tabs, loading=false, children, onSubmit, onConfirm, submitDisabled=false,
  deviceConfirm=false, footer=true, footerComponent, finishText, errorText, onError, onFinish, buttonVariant=[],
  onDeviceConfirm, onDeviceConfirmCancel, PaperProps, footerLeft, onKnow,
  submitText, locale,
  ...props}: Props) => {
  const classes = useStyles();
  const localeLangData = (locale || getLocale()).lang;

  const handleSubmit = () => {
    onSubmit && onSubmit();
  };

  const Buttons = {
    'cancel': (
      <Button key={1} variant="outlined" className={classes.button} onClick={onClose}>
        {localeLangData.cancel}
      </Button>
    ),
    'know': (
      <Button key={2} variant="contained" color="primary" className={classes.button} onClick={onKnow || onClose}>
        {localeLangData.know}
      </Button>
    ),
    'confirm': (
      <Button key={3} variant="contained" color="primary" className={classes.button} onClick={onConfirm}>
        {localeLangData.confirm}
      </Button>
    ),
    'submit': (
      <Button key={4} variant="contained" color="primary" className={classes.button} onClick={handleSubmit} disabled={loading || submitDisabled}>
        {
          loading ?
          <><CircularProgress size={18}/>&nbsp;{submitText || localeLangData.submitting}</>
          :
          submitText || localeLangData.submit
        }
      </Button>
    ),
    'finish': (
      <Button key={5} variant="contained" color="primary" className={classes.button} onClick={onClose}>
        {localeLangData.finish}
      </Button>
    ),
  };
  const {className, ...otherPaperProps} = PaperProps || {className:''};
  return (
    <Dialog onClose={onClose} open={open} disableBackdropClick PaperProps={{className: clsx(classes.paper, className), ...otherPaperProps}} {...props}>
      <DialogTitle className={classes.title}>
        {title}
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {
        tabs &&
        <div className={classes.tabs}>
          {tabs}
        </div>
      }
      <div className={classes.content}>
        {children}
      </div>
      {
        footer ?
        <div className={classes.footer}>
          {
            errorText ? <Error onError={onError} errButttonText={localeLangData.know}>{errorText}</Error>
            :
            finishText ? <Finish onFinish={onFinish || onClose} finishButtonText={localeLangData.finish}>{finishText}</Finish>
            :
            deviceConfirm ? <DeviceConfirm onDeviceConfirm={onDeviceConfirm} onDeviceConfirmCancel={onDeviceConfirmCancel}/>
            :
            [
              <div key={1} className={classes.footerLeft}>{footerLeft}</div>,
              <div className={classes.buttons} key={2}>
                {
                  buttonVariant.map((v: ButtonVariant) => Buttons[v])
                }
              </div>
            ]
          }
        </div> : footerComponent ? <div className={classes.footer}>{footerComponent}</div> : ''
      }
    </Dialog>
  );
}
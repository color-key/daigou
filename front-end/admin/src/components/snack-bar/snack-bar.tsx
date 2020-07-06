import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import ContentWrapper, {variantIcon} from './content-wrapper';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

interface Props {
  open: boolean,
  onClose?: () => void,
  variant?: keyof typeof variantIcon,
  autoHideDuration?: number,
  id?: string,
  message: string,
  vertical?: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

const TransitionLeft = (props: TransitionProps) => {
  return <Slide {...props} direction="left" />;
};

export default ({open, autoHideDuration, onClose, variant='success', message, vertical= 'top', id, horizontal='right'}: Props) => {

  return (
    <Snackbar
      id={id}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      TransitionComponent={TransitionLeft}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'client-snackbar',
      }}
      message={<ContentWrapper onClose={onClose} variant={variant} message={message} />}
    />
  );
}
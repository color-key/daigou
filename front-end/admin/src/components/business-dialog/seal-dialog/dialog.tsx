import React from 'react';
import Dialog, {DialogProps} from '../index';
import Seal from './seal';

export type Variant = 'auditing' | 'complete' | 'pending' | 'expired' | 'reject' | 'cancel' | 'pass' | 'revoked' | undefined;

interface Props extends DialogProps{
  variant: Variant
}

export default ({
  variant,
  children,
  ...props
}: Props) => {

  return (
    <Dialog {...props}>
      <Seal type={variant}/>
      {children}
    </Dialog>
  );
}
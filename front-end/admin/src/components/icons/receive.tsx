import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M469.333333 581.717333V128h85.333334v453.717333l167.338666-133.845333 59.989334 74.922667-240 192c-17.536 14.08-42.453333 14.08-59.989334 0l-240-192 59.989334-74.922667L469.333333 581.717333zM128 810.666667h768v85.333333H128v-85.333333z" />
    </SvgIcon>
  )
}
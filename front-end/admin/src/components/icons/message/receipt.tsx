import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path
        d="M896 469.333333h-85.333333V213.333333H213.333333v597.333334h597.333334v85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h597.333334a85.333333 85.333333 0 0 1 85.333333 85.333333v256z"
        fill="#212121"/>
      <path
        d="M298.666667 682.666667h85.205333l0.128 0.128V682.666667h469.333333v-85.333334h-341.76v-128L341.333333 640l-42.666666 42.666667z"
        fill="#0062FF"/>
    </SvgIcon>
  )
}
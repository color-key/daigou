import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path
        d="M810.666667 128c46.933333 0 85.333333 38.4 85.333333 85.333333v597.333334c0 46.933333-38.4 85.333333-85.333333 85.333333H213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333V213.333333c0-46.933333 38.4-85.333333 85.333333-85.333333z m0 85.333333H213.333333v597.333334h597.333334V213.333333z"
        fill="#212121"/>
      <path d="M298.666667 469.333333h426.666666v85.333334H298.666667z" fill="#0062FF"/>
    </SvgIcon>
  )
}
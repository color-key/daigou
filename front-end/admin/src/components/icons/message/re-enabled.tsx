import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M810.666667 128H212.906667C165.546667 128 128 166.4 128 213.333333v597.333334c0 46.933333 37.546667 85.333333 84.906667 85.333333H810.666667c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m0 682.666667H213.333333v-128h151.893334c29.44 50.773333 84.053333 85.333333 147.2 85.333333 63.146667 0 117.333333-34.56 147.2-85.333333H810.666667v128z m0-213.333334h-212.906667c0 46.933333-38.4 85.333333-85.333333 85.333334s-85.333333-38.4-85.333334-85.333334H213.333333l-0.426666-384H810.666667v384z" fill="#212121"/>
      <path d="M341.333333 426.666667h108.8v128h123.733334v-128H682.666667l-170.666667-170.666667z" fill="#0062FF" />
    </SvgIcon>
  )
}
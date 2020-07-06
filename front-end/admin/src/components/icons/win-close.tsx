import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M768 307.584L716.416 256 512 460.416 307.584 256 256 307.584 460.416 512 256 716.416 307.584 768 512 563.584 716.416 768 768 716.416 563.584 512z"/>
    </SvgIcon>
  )
}
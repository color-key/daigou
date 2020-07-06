import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M512 512m-490.666667 0a490.666667 490.666667 0 1 0 981.333334 0 490.666667 490.666667 0 1 0-981.333334 0Z"
            fill="#FF6059"/>
      <path d="M451.669333 512L240.469333 300.8l60.330667-60.330667L512 451.669333l211.2-211.2 60.330667 60.330667L572.330667 512l211.2 211.2-60.330667 60.330667L512 572.330667 300.8 783.530667l-60.330667-60.330667L451.669333 512z"
            fill="#000000"/>
    </SvgIcon>
  )
}

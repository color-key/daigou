import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M512 512m-490.666667 0a490.666667 490.666667 0 1 0 981.333334 0 490.666667 490.666667 0 1 0-981.333334 0Z"
            fill="#FFBD2E"/>
      <path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#000000" opacity=".7"/>
    </SvgIcon>
  )
}
